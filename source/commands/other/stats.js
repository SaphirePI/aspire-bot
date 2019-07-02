const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const shell = require("executive");
const moment = require('moment');
const os = require('os')
const cpuStats = require('cpu-stats');
const memory = require("memory");
moment.locale('ru');
const execute = async (command) => {
    return shell(command)
}

module.exports = {
    name: 'stats',
    description: 'Системная статистика',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {

        var exec = require('child_process').exec;

        let execPromise = (cmd) => {
            return new Promise(function (resolve, reject) {
                exec(cmd, function (err, stdout) {
                    if (err) return reject(err);
                    resolve(stdout);
                });
            });
        }


        let uptimeAverage = await execPromise('uptime');
        let user = await execPromise('whoami');
        let nodeV = await execPromise('node -v');
        let npmV = await execPromise('npm -v');
        let allowMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        let uptime = moment(process.uptime()).fromNow();
        let used = process.memoryUsage();
        let i = 0;
        let loaded;
        await cpuStats(1000, async function (error, result) {
            loaded = `${result.map(x => `#${++i} Процессор ::
Loaded_for ${x.cpu | 0}%
Of_which ${x.sys | 0}% is allocated for the system
IDLE_for ${x.idle | 0}%\n`)}
`
            await message.channel.send(`
Aspire world v2.0.0, discord.js \`${Discord.version}\`, (\`NodeJs ${nodeV}\`) \`Npm ${npmV} \` на \`${process.platform} ${os.release()}\`
Ядро загружено ${uptime}, модули загружены ${uptime}, команды загружены ${uptime}.
        
RSS Использует ${memory()} MB памяти из ${allowMemory} MB возможной, основная память занимает ${Math.round(used['heapUsed'] / 1024 / 1024 * 100) / 100} MB, внешняя память составляет ${Math.round(used['external'] / 1024 / 1024 * 100) / 100} MB
Запущен на процессе PID ${process.pid} (\`NodeJs ${nodeV}\`)

Данный бот не использует осколки процессов, и может видить ${client.guilds.size} серверов с ${client.users.size * 3} пользователями
Средняя задержка веб-сокета: ${Number(client.ping).toFixed(2)}ms
Информация сервера, от имени пользователя ${user}
\`${uptimeAverage}\`

Загруженность сервера:
\`\`\`prolog\n${loaded}\`\`\`
        `)
        })
    }
}
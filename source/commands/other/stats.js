const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const shell = require("executive");
const moment = require('moment');
const cpuStats = require('cpu-stats');
const memory = require("memory");
moment.locale('ru');
const execute = async (command) => {
    shell(arg, (e, r, b) => {
        return r;
    });
}

module.exports = {
    name: 'stats',
    description: 'Системная статистика',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let uptimeAverage = execute('uptime');
        let user = execute('whoami');
        let nodeV = execute('node -v');
        let npmV = execute('npm -v');
        let allowMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
        let uptime = moment(client.uptime).fromNow();
        let used = process.memoryUsage();
        let embed = new Discord.RichEmbed()
        .setColor(config.i)
        .setDescription(`
        Aspire world v2.0.0, discord.js \`${Discord.version}\`, \`NodeJs ${nodeV}, NPM ${npmV} \` на \`${process.platform()} ${os.release()}\`
        Ядро загружено ${uptime}, модули загружены ${uptime}, команды загружены ${uptime}.
        
        Использует ${memory()} MB памяти из ${allowMemory} MB возможной, память RSS занимает ${Math.round(used['rss'] / 1024 / 1024 * 100) /100} MB, внешняя память состовляет ${Math.round(used['external'] / 1024 / 1024 * 100) /100} MB
        Запущен на процессе PID ${process.pid} (\`NodeJs ${nodeV}\`)

        Данный бот не использует осколки процессов, и может видить ${client.guilds.size} серверов с ${client.users.size} пользователями
        Средняя задержка веб-сокета: ${Number(client.ping).toFixed(2)}ms
        `)
    }
}
const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const con = require('../../util/mysql');
const orderid = require('order-id')('aspire-world-keys');
module.exports = {
    name: 'warn-info',
    description: 'Просмотры варнов человека',
    aliases: ['wi', 'winfo'],
    public: true,
    async execute(client, message, args, config, settings) {
        if (!client.isPermission('KICK_MEMBERS')) return message.error('Недостаточно прав', 4, false);
        let warnid = args[0];
        if(!warnid) return message.error('Не указан ID варна', 2, false)
        con.query(`SELECT * FROM warns WHERE id = '${warnid}' AND guild = '${message.guild.id}'`, (err, rows) => {
            if(!rows[0]) return message.error('ID Варна не действительный', 3, false);
            let row = rows[0];
            let embed = new Discord.RichEmbed()
            .setColor(config.i)
            .setAuthor(client.guilds.get(row.guild).name, client.guilds.get(row.guild).iconURL)
            .setDescription(`Модератор: ${client.users.get(row.moderator) ? client.users.get(row.moderator).tag : 'Модератор покинул сервер'} (${row.moderator})
            Пользователь: ${client.users.get(row.userid) ? client.users.get(row.userid).tag : 'Пользователь покинул сервер'} (${row.userid})
            Сервер: ${client.guilds.get(row.guild).name} (${row.guild})

\`\`\`fix
${row.reason}
\`\`\`
            `)
            .setFooter(`Для снятия варна: ${settings.get(message.guild.id).prefix}rw ${args[0]}`)
            message.channel.send(embed)
        })
    }
}
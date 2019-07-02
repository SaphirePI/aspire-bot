const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const con = require('../../util/mysql');
const orderid = require('order-id')('aspire-world-keys');
module.exports = {
    name: 'unwarn',
    description: 'Просмотры варнов человека',
    aliases: ['rw', 'remove-warn'],
    public: true,
    async execute(client, message, args, config, settings) {
        if (!client.isPermission('KICK_MEMBERS')) return message.error('Недостаточно прав', 4, false);
        let warnid = args[0];
        if(!warnid) return message.error('Не указан ID варна', 2, false)
        con.query(`SELECT * FROM warns WHERE id = '${warnid}' AND guild = '${message.guild.id}'`, (err, rows) => {
            if(!rows[0]) return message.error('ID Варна не действительный', 3, false);
            con.query(`DELETE FROM warns WHERE id = '${args[0]}' AND guild = '${message.guild.id}'`);
            let embed = new Discord.RichEmbed()
            .setDescription(`WARN-CASE: ${warnid} удален`)
            .setColor(config.i)
            message.channel.send(embed)
        })
    }
}
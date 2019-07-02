const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const con = require('../../util/mysql');
const orderid = require('order-id')('aspire-world-keys');
module.exports = {
    name: 'warns',
    description: 'Просмотры варнов человека',
    aliases: ['варны', 'punisments'],
    public: true,
    async execute(client, message, args, config, settings) {
        if (!client.isPermission('KICK_MEMBERS')) return message.error('Недостаточно прав', 4, false);
        const user = message.mentions.users.first() || message.author;
        con.query(`SELECT * FROM warns WHERE userid = '${user.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
            if (!rows[0]) return message.channel.send(new Discord.RichEmbed().setColor(config.i).setDescription(`${user} не имеет каких либо варнов.`));
            let warns = Array(rows[0]);
            console.log(warns)
            let form = ``;
            let id = 0;
            warns.forEach(warn => {
                form += `[**${warn.id}**](${config.web}) :: ${client.users.get(warn.moderator) ? client.users.get(warn.moderator).tag : 'Модератор покинул сервер'}
\`\`\`fix
${warn.reason}
\`\`\`
`
            })
            let embed = new Discord.RichEmbed()
            .setAuthor(user.username, user.displayAvatarURL)
            .setDescription(form)
            .setColor(config.i)
            message.channel.send(embed);
        })
    }
}

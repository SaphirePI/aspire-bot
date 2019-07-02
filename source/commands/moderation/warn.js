const prototypes = require('../../util/prototypes');
const con = require('../../util/mysql');
const Discord = require('discord.js');
const orderid = require('order-id')('aspire-world-keys');
module.exports = {
    name: 'warn',
    description: 'Выдам пользователю варн за плохое поведение :)',
    aliases: ['punish', 'пред'],
    public: true,
    async execute(client, message, args, config, settings) {
        if (!client.isPermission('KICK_MEMBERS')) return message.error('Недостаточно прав', 4, false);
        const id = orderid.generate();

        let sql;
 let member = message.mentions.members.first();
 args.shift();
 let WarnMessage = args.join(" ");
 if (!member) return message.error("Пользователь не указан.", 2, false)
 let user = member.user;

 if (member.user.id === message.author.id) return message.error("Невозможно выписать предупреждение самому себе.", 6, false)
 if (member.user.bot) return message.error('Невозможно предупредить бота.', 6, false)
 if (member.user.id === message.channel.guild.ownerID) return message.error("Невозможно предупредить создателя сервера.", 6, false)
 if(!WarnMessage) {
 WarnMessage === 'причина не указана'
 }
 const embed = new Discord.RichEmbed()
 .setTitle("Предупреждение")
 .setColor("RED")
 .setAuthor(message.author.username, message.author.displayAvatarURL)
 .setDescription(`Пользователь: [${user} (${user.id})](${config.web})
 Модератор: [${message.author} (${message.author.id})](${config.web})
 
\`\`\`prolog
${WarnMessage}
\`\`\`
 `)
 .setFooter(`Индифицирован как ${id}`);
 message.channel.send(embed)

 member.send(`Вы получили предупреждение на сервере ${message.guild.name}.`, {embed: embed});
 sql = `INSERT INTO warns (id, user, userid, reason, moderator, guild) VALUES ('${id}', '${member.user.username}', '${member.id}', '${WarnMessage}', '${message.author.id}', '${message.guild.id}')`;
 con.query(sql);
    }
}
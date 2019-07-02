const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'Заблокирую пользователя на сервере',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let nMsg;
        if (!client.isAdmin()) return message.error('Недостаточно прав', 4, false);
        let member = message.mentions.members.first();
        if (!member) return message.error('Не указан пользователь', 2, false);
        if (!member.bannable) return message.error('Недостаточно прав', 5, false);
        if (member.highestRole.position >= message.member.highestRole.position) return message.error('Вы не можете этого сделать, пользователь которого вы хотите забанить на равне с вами или выше вас', 4, false);
        if (member.id === client.user.id) return message.error('Недостаточно прав', 5, false);
        let reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : 'Причина не указана.';
        let embed = new Discord.RichEmbed()
            .setTitle('Блокировка - ожидает утверждения')
            .setDescription(`:warning: | Вы собираетесь заблокировать ${member.user.tag} на данном сервере.

Причина:
**\`\`\`${reason}\`\`\`**
:pencil: Напишите \`confirm\` для продолжения.`)
            .setColor(config.i)
        message.channel.send({ embed: embed }).then(m => nMsg = m);

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
        collector.on('collect', message => {
            if (message.content === 'confirm') {
                let Banembed = new Discord.RichEmbed()
                    .setTitle("**Блокировка - утверждена**")
                    .setDescription(`Пользователь: [${member.user.username}#${member.user.discriminator} (${member.user.id})](${config.web})
Модератор: [${message.author.username}#${message.author.discriminator}](${config.web})
Причина:
\`\`\`${reason}\`\`\``)
                    .setColor('RED');
                nMsg.edit(Banembed);
                collector.stop();
                member.ban(reason).catch(error => {
                    message.error(error.message)
                })
            }
        })
    }
}
const Discord = require('discord.js');
const moment = require('moment');

moment.locale('ru');

module.exports = {
    name: 'server-info',
    description: 'Позволяет вам узнать информацию об текущем сервере',
    aliases: ['si', 'server', 'serverinfo', 'guild'],
    public: true,
    async execute(client, message, args, config, settings) {
        let prefix = settings.get(message.guild.id).prefix;
        let online = message.guild.members.filter(x => x.presence.status === 'online').size;
        let idle = message.guild.members.filter(x => x.presence.status === 'idle').size;
        let dnd = message.guild.members.filter(x => x.presence.status === 'dnd').size;
        let offline = message.guild.memberCount - (online + idle + dnd);
        let bots = message.guild.members.filter(x => x.user.bot).size;
        let colorD = config.i
        /*
        let bans = await message.guild.fetchBans().size || 'NP';
        let invites = await message.guild.fetchInvites().size || 'NP';
        let webhooks = await message.guild.fetchWeebhoowks().size || 'NP'; 
        */
        let guild = message.guild;
        let embed = new Discord.RichEmbed()
        .setAuthor(guild.name, guild.iconURL)
        .setColor(colorD)
        .setDescription(`Пользователи: ${guild.memberCount}
**Online: ${online} | Idle: ${idle} | Dnd: ${dnd} | Offline: ${offline} | Bots: ${bots}**
Уровень верификации: [${guild.verificationLevel}](https://xeval.dev/)
Дата создания: [${moment(guild.createdAt).format('LLLL')} (${moment(guild.createdAt).fromNow()})](https://xeval.dev/)
Дата вашего входа: [${moment(message.member.joinedAt).format('LLLL')} (${moment(message.member.joinedAt).fromNow()})](https://xeval.dev/)
`)
.addField("Количества",`
Роли: [${guild.roles.size}](https://xeval.dev/) (${prefix}roles)
Каналы: [${guild.channels.size}](https://xeval.dev/) (${prefix}channels)
Эмодзи: [${guild.emojis.size}](https://xeval.dev/) (${prefix}emojis)
Иконка: [hyperlink](${guild.iconURL}?size=2048) (${prefix}icon)
Сплеш:  [hyperlink](${guild.splashURL}?size=2048) (${prefix}splash)
\`__________________________________________________\`
Вас волнует конфиденциальность информации сервера?
Выключите команды выше: (${prefix}disable [command])
`)
/*.addField("Активы",`
Приглашения: ${invites.size || 'NP'}
Вебхуки: ${webhooks.size || 'NP'}
Баны: ${bans.size || 'NP'}`)*/
.addField("Сторонее", `
АФК: ${guild.afkChannel || 'none'} (${guild.afkChannelID || 'none'})
Системный канал: ${guild.systemChannel || 'none'} (${guild.systemChannel || 'none'})
`)
if(guild.splashURL) {
    embed.setImage(`${guild.splashURL}?size=2048`)
}
        message.channel.send({embed: embed})
    }
}
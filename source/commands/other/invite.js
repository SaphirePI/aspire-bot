const Discord = require('discord.js')
module.exports = {
    name: 'invite',
    description: 'Команда для приглашения бота на ваш сервер',
    aliases: ['p'],
    public: true,
    async execute(client, message, args, config, settings) {
        let invite = await client.generateInvite(8);
        let inviteNoPermissions = await client.generateInvite();
        let embed = new Discord.RichEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setDescription(`Желаете пригласить бота?
        С правами: [Нажмите сюда](${invite})
        Без прав: [Нажмите сюда](${inviteNoPermissions})`)
        .setColor(config.i)
        message.channel.send(embed)
    }
}
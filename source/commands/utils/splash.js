const Discord = require('discord.js');

module.exports = {
    name: 'splash',
    description: 'Позволяет вам узнать информацию об текущем сервере (сплеш)',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        if(!message.guild.splashURL) return message.error('Сервер не имеет сплеша', 6, false);
        let embed = new Discord.RichEmbed()
            .setColor(config.i)
            .setImage(`${message.guild.splashURL}?size=2048`)
        message.channel.send(embed);

    }
}
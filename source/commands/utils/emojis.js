const Discord = require('discord.js');

module.exports = {
    name: 'emojis',
    description: 'Позволяет вам узнать информацию об текущем сервере (эмодзи)',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let output = `Анимированные:
${message.guild.emojis.filter(x => x.animated).map(x => `${x} `).join(' ')}

Обычные:
${message.guild.emojis.filter(x => x.animated === false).map(x => `${x} `).join(' ')}
`
        let embed = new Discord.RichEmbed()
            .setColor(config.i)
            .setDescription(output)
        message.channel.send(embed);

    }
}
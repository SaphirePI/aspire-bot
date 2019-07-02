const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
module.exports = {
    name: 'banner',
    description: 'Создам текст на баннере, а вам это точно надо? :D',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        if(!args[0]) return message.error("Не указаны аргументы", 2, false)
        const text = args.join(" ");
        message.channel.startTyping();
        const embed = new Discord.RichEmbed()
        .setColor(config.i)
        .setImage(`https://dummyimage.com/2000x500/33363c/ffffff&text=${encodeURIComponent(text)}`);
        message.channel.send(embed)
        message.channel.stopTyping();
    }
}
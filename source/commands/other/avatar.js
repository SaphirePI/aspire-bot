const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'Покажу вам аватар пользователя',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let user = message.mentions.users.fist() || message.author;
        message.channel.startTyping();
        const embed = new Discord.RichEmbed()
        .setColor(config.i)
        .setImage(user.displayAvatarURL);
        message.channel.send(embed)
        message.channel.stopTyping();
    }
}
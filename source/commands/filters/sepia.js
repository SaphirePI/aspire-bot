const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const jimp = require('jimp')
module.exports = {
    name: 'sepia',
    description: 'Наложу эффект сепии заданую картинку или пользователя',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let url = await message.user();
        message.channel.startTyping();
        jimp.read(url).then(function (image) {
            image.sepia()
            image.getBuffer(jimp.AUTO, (err, buffer) => {
                message.channel.stopTyping()
                message.channel.sendBuffer(buffer, 'flip.png')
            })
        });
        message.channel.stopTyping();
    }
}
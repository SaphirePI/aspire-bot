const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const jimp = require('jimp')
module.exports = {
    name: 'gay',
    description: 'Наложу гей флаг на картинку или пользователя :)',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let url = await message.user();
        message.channel.startTyping();
        jimp.read(url).then(function (image) {
            jimp.read("https://cdn.glitch.com/8c009d94-1f7e-464c-82c2-bccaf15cb6cd%2Fgay.png").then(function (back) {
                image.resize(768, 768)
                back.fade(0.6)
                image.composite(back, 0, 0)
                image.getBuffer(jimp.AUTO, (err, buffer) => {
                    message.channel.stopTyping()
                    message.channel.sendBuffer(buffer, 'gay.png')
                })
            })
        });
        message.channel.stopTyping();
    }
}
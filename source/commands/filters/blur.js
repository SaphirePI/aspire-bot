const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const jimp = require('jimp')
module.exports = {
    name: 'blur',
    description: 'Замылю заданую картинку или пользователя',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let app = Math.random() * 15 + 5 | 0;
        let url = await message.user();
        message.channel.startTyping();
        jimp.read(url).then(function (image) {
            image.blur(app);
            image.getBuffer(jimp.AUTO, (err, buffer) => {
                message.channel.stopTyping()
                message.channel.sendBuffer(buffer, 'flip.png', `Использована сила эффекта: __${app}__`)
            })
        });
        message.channel.stopTyping();
    }
}
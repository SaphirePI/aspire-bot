const prototypes = require('../../util/prototypes');
const weeb = require('../../util/wrappers/weeb')
const Discord = require('discord.js');
module.exports = {
    name: 'dog',
    description: 'Дам вам рандомное изображение с собакой ^^',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let image = await weeb('animal_dog');
        let embed = new Discord.RichEmbed()
        .setImage(image.url)
        .setColor(config.i)
        .setFooter('Credits to Weeb.sh')
        message.channel.send({embed: embed})
    }
}
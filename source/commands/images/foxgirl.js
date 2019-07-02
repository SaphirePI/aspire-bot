const prototypes = require('../../util/prototypes');
const images = require('../../util/functions')
const Discord = require('discord.js');
module.exports = {
    name: 'kitsune',
    description: 'Дам вам рандомное изображение с девочкой лисой ^^',
    aliases: ['fox-girl', 'foxgirl'],
    public: true,
    async execute(client, message, args, config, settings) {
        console.log(client.functions)
        let image = await client.functions.fetch(`https://nekos.life/api/v2/img/fox_girl`);
        let embed = new Discord.RichEmbed()
        .setImage(image.url)
        .setColor(config.i)
        .setFooter('Credits to nekos life')
        message.channel.send({embed: embed})
    }
}
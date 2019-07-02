const prototypes = require('../../util/prototypes');
const images = require('../../util/functions')
const Discord = require('discord.js');
const request = require('request')
module.exports = {
    name: 'hentai',
    description: 'Выдам вам изображения по запросу hentai!',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        if(!message.channel.nsfw) return message.error("Команда относится к NSFW модулю", 0, false);
        let image = await client.functions.fetch(`https://nekos.life/api/v2/img/hentai`);
        let embed = new Discord.RichEmbed()
        .setImage(image.url)
        .setColor(config.i)
        .setFooter('Credits to nekos life')
        message.channel.send({embed: embed})
    }
}
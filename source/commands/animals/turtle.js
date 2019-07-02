const prototypes = require('../../util/prototypes');
const images = require('../../util/functions')
const Discord = require('discord.js');
module.exports = {
    name: 'turtle',
    description: 'Дам вам рандомное изображение с черепашкой ^^',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        console.log(client.functions)
        let image = await client.functions.fetch(`https://api.chewey-bot.ga/turtle?auth=${config.chewey_key}`);
        let embed = new Discord.RichEmbed()
        .setImage(image.data)
        .setColor(config.i)
        .setFooter('Credits to chewey bot')
        message.channel.send({embed: embed})
    }
}
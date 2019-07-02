const prototypes = require('../../util/prototypes');
const images = require('../../util/functions')
const Discord = require('discord.js');
module.exports = {
    name: 'fox',
    description: 'Дам вам рандомное изображение с лисом ^^',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        console.log(client.functions)
        let image = await client.functions.fetch(`https://randomfox.ca/floof/`);
        let embed = new Discord.RichEmbed()
        .setImage(image.image)
        .setColor(config.i)
        .setFooter('Credits to randomfox.ca')
        message.channel.send({embed: embed})
    }
}
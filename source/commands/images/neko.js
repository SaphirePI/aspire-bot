const prototypes = require('../../util/prototypes');
const weeb = require('../../util/wrappers/weeb')
const Discord = require('discord.js');
module.exports = {
    name: 'neko',
    description: 'Дам вам рандомное Neko изображение ^^',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let image = await weeb('neko');
        let embed = new Discord.RichEmbed()
        .setImage(image.url)
        .setColor(config.i)
        .setFooter('Credits to Weeb.sh')
        message.channel.send({embed: embed})
    }
}
const prototypes = require('../../util/prototypes');
const weeb = require('../../util/wrappers/weeb')
const Discord = require('discord.js');
module.exports = {
    name: 'dmeme',
    description: 'Дам вам рандомный мем с дискорда ^^',
    aliases: ['discord-meme'],
    public: true,
    async execute(client, message, args, config, settings) {
        let image = await weeb('discord_memes');
        let embed = new Discord.RichEmbed()
        .setImage(image.url)
        .setColor(config.i)
        .setFooter('Credits to Weeb.sh')
        message.channel.send({embed: embed})
    }
}
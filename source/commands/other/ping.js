const Discord = require('discord.js')
const request = require('request');
module.exports = {
    name: 'ping',
    description: 'Тестовая команда для проверки состояния бота',
    aliases: ['p'],
    public: true,
    async execute(client, message, args, config, settings) {
        let startDate = Date.now();
        let lastDate;
        (async () => {
            const newDate = await Date.now();
            await settings.get(message.guild.id);
            lastDate = Date.now() - newDate;
        })()
        request(config.web, (r,e,b) => {
            let webPing = Date.now() - startDate;
            let embed = new Discord.RichEmbed()
            .setDescription(`Mathing responses...
            
Client heartbeat     :: ${startDate - message.createdTimestamp}ms
Discord api response :: ${client.ping | 0}ms
More responses       :: ${client.pings.join("ms; ")}ms
Database response    :: ${lastDate}ms`)
            .setColor(config.i)
            message.channel.send(embed)
        })
    }
}
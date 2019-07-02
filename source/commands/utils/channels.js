const Discord = require('discord.js');

module.exports = {
    name: 'channels',
    description: 'Позволяет вам узнать информацию об текущем сервере',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let channels = [];
        let voice = [];
        let category = [];
        message.guild.channels.filter(x => x.type === 'text').forEach((channel, num, channels_all) => {
            channels[channels_all.size-channel.position] = channel; //.name.replace(/`/g, "`" + String.fromCharCode(8203))
        });
        message.guild.channels.filter(x => x.type === 'voice').forEach((channel, num, channels_all) => {
            voice[channels_all.size-channel.position] = `<#${channel.id}>`; //.name.replace(/`/g, "`" + String.fromCharCode(8203))
        });
        message.guild.channels.filter(x => x.type === 'category').forEach((channel, num, channels_all) => {
            category[channels_all.size-channel.position] = `<#${channel.id}>`; //.name.replace(/`/g, "`" + String.fromCharCode(8203))
        });
        let output = `Категории:
${category.map(x => `${x}; `).join('\n')}

Текстовые каналы:
${channels.map(x => `${x}; `).join(' ')}

Голосовые каналы:
${voice.map(x => `${x}; `).join(' ')}
`
        let embed = new Discord.RichEmbed()
            .setColor(config.i)
            .setDescription(output)
        message.channel.send(embed);

    }
}
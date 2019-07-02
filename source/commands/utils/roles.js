const Discord = require('discord.js');

module.exports = {
    name: 'roles',
    description: 'Позволяет вам узнать информацию об текущем сервере',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        let roles = [];
        message.guild.roles.forEach((role, num, roles_all) => {
            roles[roles_all.size-role.position] = role //.name.replace(/`/g, "`" + String.fromCharCode(8203))
        });
        let output = roles.map(x => `${x}, `).join(" ");
        let embed = new Discord.RichEmbed()
            .setColor(config.i)
            .setDescription(output)
        message.channel.send(embed);

    }
}
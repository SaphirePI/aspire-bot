const shell = require("executive");
const Discord = require('discord.js');
module.exports = {
    name: 'shell',
    description: 'Команда для произвольной эмуляции SH кода',
    aliases: [],
    public: false,
    async execute(client, message, args, config, settings) {
        let arg = args.join(" ");
        if (!arg) return error("Не указан код выполнения");
        message.channel.send(`Oбработка команды`).then(mym => {
            shell(arg, (e, r, b) => {
                if (e) return mym.edit(new Discord.RichEmbed().setColor('BLURPLE').setDescription(e));
                message.channel.send(r, { split: "\n", code: 'bash' });
            });
        })
    }
}
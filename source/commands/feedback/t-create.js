const Discord = require('discord.js')
const request = require('request');
module.exports = {
    name: 't-create',
    description: 'Команда для создания feedback-help тикета',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        const tickets = client.tickets;
        let t = tickets.get(message.author.id);
        if (t) return message.error('Тикет уже есть, опишите вашу текущею проблему (или новую) в личные сообщения боту, и ожидайте ответа', 6, false);
        client.guilds.get(config.support).createChannel(message.author.username, {
            parent: config.supportC
        }).then(c => {
            let sheme = {
                user: message.author.id,
                channel: c.id,
                header: args[0] ? args.join(" ") : "Заголовок не указан",
                createdAt: Date.now(),
                mod: [],
                status: "Ожидает сотрудника"
            };
            tickets.ensure(message.author.id, sheme);
        })
        let sheme = {
            user: message.author.id,
            header: args[0] ? args.join(" ") : "Заголовок не указан",
            createdAt: Date.now(),
            status: "Ожидает сотрудника"
        };
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setColor(config.i)
            .setDescription(`User: ${sheme.user}
Заголовок: ${sheme.header}
UNIX: ${sheme.createdAt}
Статус: ${sheme.status}

**ТИКЕТ СОЗДАН**`)
        message.channel.send(embed)
    }
}
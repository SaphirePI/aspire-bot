const Discord = require('discord.js')
const request = require('request');
module.exports = {
    name: 't-close',
    description: 'Команда для закрытия feedback-help тикета',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        const tickets = client.tickets;
        let t = tickets.get(message.author.id);
        if (!t) return message.error('Тикета нет, вы его не создавали', 6, false);
        tickets.set(message.author.id, 'Закрыт', 'status');
        client.channels.get(t.channel).send("Пользователь закрыл тикет");
        message.channel.send("Тикет был закрыт, ваши сообщения архивированы на 7 дней, ради улучшения качетсва обслуживания и проверки стороних факторов.");
    }
}
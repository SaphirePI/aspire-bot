const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
module.exports = {
    name: 'clear',
    description: 'Очищу чат от сообщений, или от сообщений пользователя',
    aliases: ['prune', 'clean'],
    public: true,
    async execute(client, message, args, config, settings) {
        if (!client.isPermission()) return message.error('Недостаточно прав', 4, false);
        const user = message.mentions.users.first();
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.error("Не указаны аргументы", 2, false);
        if (!amount && !user) return message.error("Не указаны аргументы", 2, false);
        message.channel.fetchMessages({
            limit: amount,
        }).then((messages) => {
            if (user) {
                const filterBy = user ? user.id : Client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            }
            message.channel.bulkDelete(messages).catch(error => message.error(error.message, 5, false))
            if (user) {
                message.channel.send(new Discord.RichEmbed().setColor(config.i)
                .setDescription(`Было удалено ${amount} сообщений от пользователя ${user}. \nЗапрос пользователем **${message.author}**`)).then(m => m.delete(4000));
            }
            if (!user) {
                message.channel.send(new Discord.RichEmbed().setColor(config.i)
                .setDescription(`Было удалено ${amount} сообщений. \nЗапрошено пользователем **${message.author}**`)).then(m => m.delete(4000));
            }
            message.delete()
        });
    }
}
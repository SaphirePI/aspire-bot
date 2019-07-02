module.exports = {
    name: 'reverse',
    description: 'Переверну текст, который вы мне дали!',
    aliases: [],
    public: true,
    async execute(client, message, args, config) {
        let text = args.join(" ");
        if(!text) return message.error("Не указаны аргументы для продолжения", 2, false)
        textN = text.split("").reverse().join("");
        if(text === textN) return message.channel.send("Может я не вижу разницы, но это так не работает)")
        message.channel.send(textN);
    }
}
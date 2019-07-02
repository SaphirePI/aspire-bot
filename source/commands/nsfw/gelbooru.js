const prototypes = require('../../util/prototypes');
const images = require('../../util/functions')
const Discord = require('discord.js');
const request = require('request')
module.exports = {
    name: 'gelbooru',
    description: 'Выдам вам изображения по запросу с gelbooru!',
    aliases: ['gb'],
    public: true,
    async execute(client, message, args, config, settings) {
        let page = args[0];
        if (!page) return message.channel.send("Укажите страницу");
        if (isNaN(page)) return message.channel.send("Укажите страницу, а потом тег[и]");
        args.shift()
        let search = args.join(" ");
        request("https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&tags=" + search + "&pid=" + page, function (err, res, body) {
            try {
                let arr = JSON.parse(body)
                for (i = 0; i < 3; i++) {
                    message.channel.send(`📝 | score: ${arr[i].score} | rating: ${arr[i].rating} \n${arr[i].file_url}`)
                }
            } catch (err) { message.channel.send("Поиск не дал результатов") }
        })
    }
}
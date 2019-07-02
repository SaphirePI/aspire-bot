const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
module.exports = {
    name: '8ball',
    description: 'Отвечу на ваш вопрос',
    aliases: ['ball'],
    public: true,
    async execute(client, message, args, config) {
        if(!args[0]) return message.error('Не указан вопрос', 2, false)
       let question = args.join(" ");
       let answers = ['Без сомнения!', 'Да, конечно!', 'Да', 'Может быть', 'И такое возможно', 'Не думаю', 'Звучит как ложь', 'Абсолютно нет!', 'Не уверен в этом', 'Сомневаюсь'];
       let answer = answers.random();

       let embed = new Discord.RichEmbed()
       .setAuthor('Magic 8 ball', 'https://cdn3.iconfinder.com/data/icons/sport-equipment-7/32/Sport-8-ball-billiards-eight-magic-pool-03-512.png')
       .addField('Question', '**'+question+'**')
       .addField('Answer', '**'+answer+'**')
       .setColor("#224193")
       message.channel.send({embed: embed})
    }
}
const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
module.exports = {
    name: 'choose',
    description: 'Выберу 1 вариант из всех которые вы предоставили',
    aliases: ['select'],
    public: true,
    async execute(client, message, args, config, settings) {
        if(!args[0]) return message.error(`Не указаны варианты, введите варианты разделяя их знаком \` \`|\` \`, пример: ${settings.get(message.guild.id).prefix}select да | нет | может быть`, 2, false)
       let answers = args.join(" ").split(" | ");
       let answer = answers.random();
        if(String(answers.join("; ").length > 1024)) return message.error('Слишком много выборов', 9, false);
       let embed = new Discord.RichEmbed()
       .setAuthor('🎲 Pseudorandom')
       .addField('Variables', '**'+answers.join("; ")+'**')
       .addField('Answer', '**'+answer+'**')
       .setColor("#fd3132")
       message.channel.send({embed: embed}).catch(err => { message.error('Слишком много выборов', 9, false)})
    }
}
const Discord = require('discord.js')
module.exports = {
    name: 'settings',
    description: 'Команда для настройки сервера',
    aliases: ['set', 'config'],
    public: true,
    async execute(client, message, args, config, settings) {
        if(!client.isAdmin()) return message.error('Недостаточно прав для выполнения команды', 4, false);
        let method = args[0];

        let commandManagment = ['unknownCommands', 'errorMessages', 'autoComplete', 'completeMessage', 'prefix'];
        let preview = ['show', 'docs']
        if(!method) return message.channel.send(`
\`\`\`css\nsettings@AspireBot~/Settings-list#\`\`\`

Use \`settings.get(message.guild.id).prefixsettings [module]\` to change settings for specific module

**Command managment**: \`${commandManagment.join('\`, \`')}\`
**Preview**: \`${preview.join('\`, \`')}\`

`
        )
        if(method === 'unknownCommands') {
            if(settings.get(message.guild.id).unknownCommands === true) {
                settings.set(message.guild.id, false, 'unknownCommands')
                message.channel.send("Опция выключена, теперь бот не будет отвечать на неизвестные ему команды");
            } else {
                settings.set(message.guild.id, true, 'unknownCommands')
                message.channel.send("Опция включена, теперь бот будет отвечать на неизвестные ему команды")
            }
        } else if(method === 'errorMessages') {
            if(settings.get(message.guild.id).errorMessages === true) {
                settings.set(message.guild.id, false, 'errorMessages')
                message.channel.send("Опция выключена, теперь бот не будет отсылать ошибки, если команда не была выполнена");
            } else {
                settings.set(message.guild.id, true, 'errorMessages')
                message.channel.send("Опция включена, теперь бот будет отсылать ошибки, если команда не была выполнена")
            }
        } else if (method === 'prefix') {
            args.shift();
            let prefix = args[0];
            settings.set(message.guild.id, prefix ? prefix : config.prefix, 'prefix');
            message.channel.send(`Опция изменена, теперь бот будет реагировать на префикс \`${prefix ? prefix : config.prefix}\``)
        } else if(method === 'autoComplete') {
            if(settings.get(message.guild.id).autoComplete === true) {
                settings.set(message.guild.id, false, 'autoComplete')
                message.channel.send("Опция выключена, теперь бот не будет дополнять команду, если та набрана не правильно");
            } else {
                settings.set(message.guild.id, true, 'autoComplete')
                message.channel.send("Опция выключена, теперь бот будет дополнять команду, если та набрана не правильно")
            }
        } else if(method === 'completeMessage') {
            if(settings.get(message.guild.id).completeMessage === true) {
                settings.set(message.guild.id, false, 'completeMessage')
                message.channel.send("Опция выключена, теперь бот не будет отсылать сообщения, если команда была дополнена");
            } else {
                settings.set(message.guild.id, true, 'completeMessage')
                message.channel.send("Опция включена, теперь бот будет отсылать сообщения, если команда была дополнена");
            }
        } else if(method === 'show') {
            message.channel.send(`
settings@AspireBot~/${message.guild.name}-config#

M unknownCommands: ${settings.get(message.guild.id).unknownCommands}
M errorMessages: ${settings.get(message.guild.id).errorMessages}
C autoComplete: ${settings.get(message.guild.id).autoComplete}
C completeMessage: ${settings.get(message.guild.id).completeMessage}
C disabledCommands: [ ${settings.get(message.guild.id).disabledCommands.join(', ')} ]
C disabledCategories: [ ${settings.get(message.guild.id).disabledCategories.join(', ')} ]
G prefix: ${settings.get(message.guild.id).prefix}
`, {code: 'prolog'})
        } else if (method === 'docs') {
            let embed = new Discord.RichEmbed()
            .setTitle('Знакомство')
            .setDescription(`Если вы видите данное сообщение, значит бота первый раз использовали на сервере, и он уже установил вам стандартные настройки (${settings.get(message.guild.id).prefix}settings show)
Пожалуйста, не игнорируйте данное сообщение.
Позовите вашего администратора, и попросите настроить бота для вашего сервера, это ЗНАЧИТЕЛЬНО облегчит работу со мной.

**\`\`\`prolog
C disabledCommands: список отключенных команд, их невозможно выполнить никому на сервере

C disabledCategories: список отключенных категорий, команды входящие в них невозможно выполнить никому на сервере

M errorMessages: При ошибки выполнения команды, бот будет отсылать сообщение с ошибкой, например, неизвестная команда для помощи '${settings.get(message.guild.id).prefix}help acd'

M unknownCommands: При попытке выполнить команду которой нет, бот будет отсылать ошибку, игнорирует правило "errorMessages"

C autoComplete: При попытке набора неизвестной команды, бот начнет искать команду, которая больше всех похожа на ту, что пытались набрать, игнорирует правило "unknownCommands"

M completeMessage: Как только сработает правило "autoComplete", бот сообщит об этом, в противном случае промолчит, игнорирует правило "errorMessages"

G prefix: Указывает префикс который работает только на этом сервере

true = включено, false = выключено;
\`\`\`**

Для смены true-false конфигурации, достаточно их написать (${settings.get(message.guild.id).prefix}settings errorMessages)
Для смены конфигурации с аргументами, нужно их указать (${settings.get(message.guild.id).prefix}settings prefix >)

Префикс не может состоять из более 1 аргумента.

Данное сообщение должно появлятся при первом сообщении на сервере, не удивляйтесь такой форме приветсвия.
`)
            .setColor(config.i)
        message.channel.send(embed)
        }
    }
}
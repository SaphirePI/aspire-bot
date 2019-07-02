module.exports = {
    name: 'enable',
    description: 'Команда для включения других команд',
    aliases: [],
    public: true,
    async execute(client, message, args, config, settings) {
        if(!client.isAdmin()) return message.error('Недостаточно прав для выполнения команды', 4, false);
        let command = args[0];
        commandN = client.commands.get(command);
        if(commandN === undefined) return message.error('Данной команды нет', 3, false);
        if(['disable', 'enable', 'settings', 'help'].includes(command)) return message.error('Невозможно включить системную команду, если она отключена разработчиком', 6, false);
        settings.remove(message.guild.id, command, 'disabledCommands');
        message.channel.send('Команда включена!')
    }
}
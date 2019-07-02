module.exports = {
    name: "help",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["h"],
    public: true,
    async execute(client, message, args, config, settings) {
        function list(cat, cname) {
            return `**__${cname}__**: ${client.commands
                .filter(cmd => cmd.category == cat)
                .map(cmd => `\`${cmd.name}\``)
                .join(", ")}`;
        }
        let command = args[0];
        if (!command)
            return message.channel.send(`
\`\`\`prolog\nhelp@AspireBot~/Commands-list#\`\`\`

Use \`${settings.get(message.guild.id).prefix}help [command]\` to get more info on a specific command
Total commands size: __**${client.commands.size}**__

${list("fun", "Fun")}
${list("reactions", "User Reactions")}
${list("images", "Images")}
${list("animals", "Animals")}
${list("filters", "Filters")}
${list("utils", "Utils")}
${list("moderation", "Moderation")}
${list("other", "Other")}
${list("nsfw", "Nsfw")}
${list("owner", "Owner")}
${list("feedback", "Feedback")}
${list("settings", "Settings")}

Что случилось? :: https://xeval.dev/xeval/refactor
Что и как настроить? :: ${settings.get(message.guild.id).prefix}settings docs
`);
        command = client.commands.get(command);
        if (command === undefined && settings.get(message.guild.id).errorMessages === true) {
            return message.error('Указана неправильная команда', 3, false);
        } else {
            try {
            message.channel.send(`
\`\`\`prolog\nhelp@AspireBot~/Command-${command.name}#\`\`\`
\`\`\`prolog
Name: ${command.name}
Aliases: ${command.aliases.join("; ")}
Description: ${command.description}
Public: ${command.public ? 'yes' : 'no'}
\`\`\`
`)
            } catch (err) {} 
        }
    }
};

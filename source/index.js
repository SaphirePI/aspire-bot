const core = require('./core/guru.core'),
    config = require('../config'),
    Discord = require('discord.js'),
    Enmap = require('enmap'),
    errors = require('./util/errors'),
    fs = require('fs'),
    functions = require('./util/functions'),
    prefix = config.prefix,
    guildsSettings = new Enmap({
        name: 'guild_settings'
    });
bot = new core(config.token, true, { disableEveryone: true });

bot.run();
this.client = bot.client;
this.functions = functions;
this.client.functions = this.functions;
this.client.commands = new Enmap();
this.client.warns = new Enmap({
    name: 'warns'
})
this.client.tickets = new Enmap({
    name: 'tickets'
});
fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${module}/${file}`);
        command.category = module;
        this.client.commands.set(command.name, command);
    }
})

this.client.on('message', async message => {
    if(message.author.bot) return;
    if (message.channel.type === 'dm') {
        let user = this.client.tickets.get(message.author.id);
        if(user.status === 'Закрыт') return;
        if(message.content) this.client.channels.get(user.channel).send(message.content);
        if(message.attachments.first()) this.client.channels.get(user.channel).send({
            files: [message.attachments.first().url]
        }).catch(err => {});
    }
    if(!message.channel.id === '595525048358666260') return;
        let user = this.client.tickets.find(x => x.channel === message.channel.id);
        if(!user) return;
        if(user.status === 'Закрыт') return;
        if(message.content) this.client.users.get(user.user).send(message.content);
        if(message.attachments.first()) this.client.users.get(user.user).send({
            files: [message.attachments.first().url]
        }).catch(err => {});
})

this.client.on('message', async message => {
    if (!message.guild) return;
    if (!message.channel.type === 'channel') return;
    if(message.content.startsWith('x!')) return message.channel.send("Похоже что произошло глобальное обновление...\nЕсли вы не понимаете что произошло, прочитайте данный документ https://xeval.dev/xeval/refactor\nПрефикс был изменен на `>`, если вам не удобно, и вы хотите старый префикс, используйте `>settings prefix x!`\nУдачи.");
    this.client.isAdmin = (user = message.author.id, guild = message.guild.id) => {
        if (this.client.guilds.get(guild).members.get(user).permissions.has('ADMINISTRATOR')) {
            return 1;
        }
        return 0;
    }
    this.client.isPermission = (per = 'MANAGE_MESSAGES', user = message.author.id, guild = message.guild.id) => {
        if (this.client.guilds.get(guild).members.get(user).permissions.has(per)) {
            return 1;
        }
        return 0;
    }

    let _Settings = await guildsSettings.get(message.guild.id);
    sheme = {
        disabledCommands: [],
        disabledCategories: [],
        errorMessages: true,
        unknownCommands: false,
        autoComplete: false,
        completeMessage: true,
        _premium: false,
        prefix: config.prefix
    };
    await guildsSettings.ensure(message.guild.id, sheme);

    message.user = async () => {
        let user = message.mentions.users.first();
        let url;

        if (!user) {
            if (args[0]) {
                if (message.attachments.first()) {
                    url = message.attachments.first().url;
                } else {
                    user = this.client.functions.find(message, args.join(" "), 'members');
                    url = user.user.displayAvatarURL;
                }
            } else {
                user = message.author;
                url = user.displayAvatarURL;
            }
            if (message.attachments.first()) url = message.attachments.first().url;
        } else {
            url = user.displayAvatarURL;
        }
        return url;
    }
    message.channel.sendBuffer = (buffer, name, ctx) => {
        return message.channel.send(ctx ? ctx : '', {
            files: [{
                attachment: buffer,
                name: name
            }]
        })
    }
    message.error = (ctx, code = 0, w = true) => {
        code = errors[code];
        let embed = new Discord.RichEmbed()
            .setDescription(
                this.functions.parse(
                    `При попытке выполнить команду была обнаружена ошибка${w ? ', она уже отправлена разработчику' : '.'}\n\`{{code}}: {{ctx}}\``,
                    {
                        code: code,
                        ctx: ctx
                    }
                )
            )
            .setFooter(`Case ${message.id}:${message.author.id}:${message.channel.id}:${message.guild.id}`)
            .setColor('RED')
        if (w === true) {
            this.client.users.get(config.owner).send(embed);
        }
        message.channel.send(embed);
    };
    _Settings = await guildsSettings.get(message.guild.id);
    if (message.content === `<@${this.client.user.id}>`) return message.channel.send(`Для начала работы со мной, напишите '${_Settings.prefix}help', что бы сбросить префикс, напишите '${_Settings.prefix}settings prefix'`)
    if (!message.content.startsWith(_Settings.prefix)) return;
    const args = message.content.slice(_Settings.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = this.client.commands.get(cmdName)
        || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if (command === null || !command) {
        let commandClose = this.functions.find(message, cmdName, 'commands', this.client);
        if (_Settings.autoComplete === true && _Settings.completeMessage) message.channel.send(`Была исполнена команда ${commandClose.name}, так как она более всего похожа на ваш запрос`);
        if (_Settings.autoComplete === true) return commandClose.execute(this.client, message, args, config, guildsSettings);
        if (guildsSettings.get(message.guild.id).unknownCommands === true) return message.error(`Невозможно выполнить команду '${cmdName}', ее нет.`, 1, false)
    } else {
        if (command.public === false && message.author.id !== config.owner) return message.error('Вы не владелец', 8, false);
        try {
            if (!_Settings.disabledCommands.indexOf(command.name)) {
                if (_Settings.errorMessages === true) return message.error('Команда не может быть запущена, так как отключена', 7, false);
                return;
            }
            command.execute(this.client, message, args, config, guildsSettings);
        } catch (error) {
            message.error(error.message)
        };
    };
});

this.client.on('ready', async todo => {
    console.log('Lauched.')
});

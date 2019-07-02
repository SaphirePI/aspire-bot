const prototypes = require('../../util/prototypes');
const Discord = require('discord.js');
const con = require('../../util/mysql');
const orderid = require('order-id')('aspire-world-keys');
module.exports = {
    name: 'reload',
    description: 'Перезагрузить файл/команду',
    aliases: ['r'],
    public: false,
    async execute(client, message, args, config, settings) {
        if (!args || args.size < 1) return message.channel.send(":/");
        const a = args[0]
        const path = args[1]
        const name = args[2]
        if (a === "command") {
            try {
                delete require.cache[require.resolve(`${path}.js`)]
                client.commands.delete(name);
                const props = require(`${path}.js`);
                client.commands.set(name, props);
                message.channel.send(`\`${path}.js\` здох..`);
            } catch (error) {
                message.channel.send("\`" + error + "\`")
            }
        } else if (a === "file") {
            try {
                delete require.cache[require.resolve(`${path}`)]
                message.channel.send("dasdasdas")
            } catch (error) {
                message.channel.send("\`" + error + "\`")
            }
        }
    }
}
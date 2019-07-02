const { inspect } = require("util");
const Discord = require('discord.js');
module.exports = {
    name: 'eval',
    description: 'Команда для произвольной эмуляции кода',
    aliases: [],
    public: false,
    async execute(client, message, args, config, settings) {
        let embed = new Discord.RichEmbed()
        const code = args.join(" ");
        const token = client.token.split("").join("[^]{0,2}");
        const rev = client.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let hrDiff;
            const hrStart = process.hrtime();
            hrDiff = process.hrtime(hrStart);
            let output = eval(code);
            let asd = output;
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) {
                message.channel.send(`\`\`\`fix\nOutput type: ${typeof asd}\nExecution time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms\nOutput:\`\`\`\n\`\`\`json\n\n${output}\n\`\`\``);
                message.react("✅")
            } else {
                message.author.send(`${output}`, { split: "\n", code: "js" });
            }
        } catch (error) {
            message.channel.send(`Error \`\`\`js\n${error}\`\`\``);
            message.react("❎")
        }

        function clean(text) {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }

    }
}
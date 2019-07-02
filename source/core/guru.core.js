const Discord = require('discord.js')

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

class Bot {
    constructor(token, debug, options) {
        this.token = token;
        this.debug = debug;
        this.options = options;
        this.runned = false;
        this.client = new Discord.Client(options)
        if (typeof this.token === 'string' && this.token !== null || this.token !== undefined) {
            console.log('Token is binded into Discord Client. Waiting for run.');
        } else {
            throw new Error('Token is not binded, provide token in main config file.');
        }
        this.run = async () => {
            this.runned = true;
            await this.client.login(this.token);
            await this.client.on('ready', async r => {
                await console.log('Lauched.')
                if (debug === true) {
                    this.client.on('debug', async output => {
                        await console.info(output)
                    })
                }
            })
        }
    }
}
module.exports = Bot;
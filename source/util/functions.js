const Discord = require('discord.js');
const request = require('request');
const n_fetch = require('node-fetch')
const sm = require('string-similarity');
exports.time = function (zone) {
                if(!zone) zone = 3;
                return (new Date(new Date().getTime() + zone*60*60*1000)).toISOString().replace(/(.*?)T/, '').replace(/\..+/, '')
}
exports.clear_count = function (channel, count, count_all = 0) {
    if (count > 100) {
        count_all = count_all + 100;
        channel.bulkDelete(100).then(() => {clear_count(channel, count-100, count_all)});
    } else {
        channel.bulkDelete(count).then(messages => {
            count_all = count_all + messages.size;
            channel.send(`Удалено ${count_all} сообщений.`).then((msg) => {msg.delete(3000);});
        });
    }
}


exports.decToHex = function(dec) {
        return (parseInt(dec)).toString(16);
}

exports.hexToDec = function(hex) {
        return parseInt(hex, 16);
}

exports.wrap = function(text) {
        return '```\n' + text.replace(/`/g, '`' + String.fromCharCode(8203)) + '\n```';
}

exports.find = function(message, tofind, field, client) {
        if(!message) throw new Error("You must send <message> as first argument [1]");
        if(!tofind) throw new Error("You must send <string> as second argument [2]['Provide string to search in field']");
        if(!field) throw new Error("You must send <string> as third argument [3]['Provide field to search (members, users, roles)']")
        if(field === 'members') {
        let members = [];
        let indexes = [];
        message.guild.members.forEach(function(member){
        members.push(member.user.tag);
        indexes.push(member.user.id);

        })
        let match = sm.findBestMatch(tofind, members);
        let named = match.bestMatch.target;
        member = message.guild.members.get(indexes[members.indexOf(named)]);
        return member;
        } else if(field === 'users') {
        if(!client) throw new Error("You must send Client as last argument [4]")
        let users = [];
        let indexes = [];
        client.users.forEach(function(user){
        users.push(user.tag);
        indexes.push(user.id);

        })
        let match = sm.findBestMatch(tofind, users);
        let named = match.bestMatch.target;
        user = client.users.get(indexes[users.indexOf(named)]);
        return user;
        } else if(field === 'roles') {
        let roles = [];
        let indexes = [];
        message.guild.roles.forEach(function(role){
        roles.push(role.name);
        indexes.push(role.id);

        })
        let match = sm.findBestMatch(tofind, roles);
        let named = match.bestMatch.target;
        role = message.guild.roles.get(indexes[roles.indexOf(named)]);
        return role;
        } else if (field === 'commands') {
        let commands = [];
        let indexes = [];
        client.commands.forEach(function(command){
        commands.push(command.name);
        indexes.push(command.name);
        })
        let match = sm.findBestMatch(tofind, commands);
        let named = match.bestMatch.target;
        command = client.commands.get(indexes[commands.indexOf(named)]);
        return command;
        }

        //HOW TO//
        //1 ARGUMENT - <Message>
        //2 ARUGMENT - Your <String> To search in 3 ARGUMENT
        //3 ARGUMENT - Field <String>, to match results
        //4 ARGUMENT - Required only in FIELD<users>
        //users will return <User>
        //members will return Guild<member>
        //roles will return Guild<role>

}

const vowels = ['a','e','i','o','u','y'];
exports.combinename = function(name1,name2){
        var count1=-1,count2=-1;
        var mid1 = Math.ceil(name1.length/2)-1;
        var mid2 = Math.ceil(name2.length/2)-1;
        var noVowel1=false,noVowel2=false;
        for(i=mid1;i>=0;i--){
                count1++;
                if(vowels.includes(name1.charAt(i).toLowerCase())){
                        i = -1;
                }else if(i==0){
                        noVowel1=true;
                }
        }
        for(i=mid2;i<name2.length;i++){
                count2++;
                if(vowels.includes(name2.charAt(i).toLowerCase())){
                        i = name2.length;
                }else if(i==name2.length-1){
                        noVowel2=true;
                }
        }

        var name = "";
        if(noVowel1&&noVowel2){
                name = name1.substring(0,mid1+1);
                name += name2.substring(mid2);
        }else if(count1<=count2){
                name = name1.substring(0,mid1-count1+1);
                name += name2.substring(mid2);
        }else{
                name = name1.substring(0,mid1+1);
                name += name2.substring(mid2+count2);
        }
        return name;
}
exports.toMs = function strToMs(str) {
    let ms = 0,
        eq = {
            y: 3.1536e10,
            M: 2628002880,
            w: 6.048e8,
            d: 8.64e7,
            h: 3.6e6,
            m: 6e4,
            s: 1e3,
        },
        r = '([0-9]+)([a-zA-Z]+)';
    str.match(new RegExp(r, 'g')).forEach(m => {
        let arr = m.match(new RegExp(r, ''));
        if (Object.keys(eq).includes(arr[2]))
            ms += eq[arr[2]] * parseInt(arr[1]);
    });
    return ms;
}
exports.fetch = async (link) => {
    return n_fetch(link).then(x => x.json());
}
exports.selection = async function(message, selections = [], options = {}){
        this.message = message;
        if(!Array.isArray(selections)) return [selections, 0];
        if(!selections.length) return [];
        if(selections.length == 1) return[selections[0], 0];
        let { res = "en", title = "Меню выбора", footer = "Наберите соответствующую цифру для ответа", mapFunc, cancel = 'exit', time = 60 } = options,
            choices = (mapFunc ? selections.map(mapFunc) : selections).slice(0, 10),
            mess;
        try{
            mess = await this.message.channel.send(`\`\`\`xl\n${title}\n\n${choices.map((c, i) => `[${i + 1}] ${c}`).join('\n')}${selections.length > 10 ? '\n' + `И ещё ${selections.length - 10} пунктов` : ''}\n\n${Array.isArray(footer) ? footer.join('\n') : footer}\nВведите '${cancel}', чтобы выйти из меню\`\`\``);
            let coll = this.message.channel.createMessageCollector(m => m.author.id == this.message.author.id, {time: time * 1000});
            const awaitMessages = async (msg) => {
                let ans;
                try{
                    ans = await coll.next;
                    if(ans.content.toLowerCase() == cancel) return Promise.reject();
                    try{
                        if(isNaN(parseInt(ans.content)) || (parseInt(ans.content) < 0 || parseInt(ans.content) > selections.length + 1)) throw 'netak'
                        return ans.content;
                    }catch(err){
                        console.log(err)
                        const display = err.err || err.message || err;
                        const p2 = this.message.channel.send(`Предоставлен недействительный ответ. Попробуйте ещё раз. Введите '${cancel}', чтобы выйти из меню`);
                        return awaitMessages(p2);
                    }
                }catch(e){
                    return Promise.reject(e);
                }
            }
            const b = await awaitMessages(mess);
            return [selections[b - 1], b - 1];
            /*let ans = await coll.next,
                resp = ans.content;
            return [selections[resp - 1], resp - 1];*/
            //return [selections[resp - 1], resp - 1];
        }catch(e){
            return [];
        }
    }

locate = (fullkey, obj) => {
    let keys = fullkey.split('.');
    let val = obj[keys.shift()];
    if (!val) return null;
    for (let key of keys) {
        if (!val[key]) return val;
        val = val[key];
        if (Array.isArray(val)) return val.join('\n');
    }
    return val || null;
};
exports.parse = (string, options = {}) => {
    if (!string) return string;
    return string.split(' ').map(str => (
        str.replace(/\{\{(.+)\}\}/gi, (matched, key) => (
            locate(key, options) || matched
        ))
    )).join(' ');
};
const { ListenerBase } = require('../../index.js');
const { Collection, Permissions } = require('discord.js');

module.exports = class extends ListenerBase {

    constructor(...args) {
        super(...args, {
            name: 'message',
            once: false,
        });
    }

    async execute(message) {
        if (message.author.id === this.client.user.id && this.blockClient) return; 
        if (message.author.bot && this.client.blockBots) return;
        
        const mentionedPrefix = RegExp(`^<@!?${this.client.user.id}> `);
    
        const commandPrefix = this.client.allowMentionPrefix ? message.content.match(mentionedPrefix) ?
        message.content.match(mentionedPrefix)[0] : Array.isArray(this.client.prefix) ? 
        this.client.prefix.find(pre => message.content.startsWith(pre)) : this.client.prefix : this.client.prefix;
    
        if (!message.content.startsWith(commandPrefix)) return;
    
        const [commandName, ...args] = message.content.slice(commandPrefix.length).trim().split(/ +/g); 
    
        const command = this.client.commands.get(commandName)
            || this.client.commands.get(this.client.aliases.get(commandName));
    
        if (command) {
            const checkValidPermission = (permArr) => {
                if (permArr.some(perm => !(Object.keys(Permissions.FLAGS)).includes(perm))) {
                    throw new TypeError(`Akago: Command '${commandName}' has invalid client or member permissions.`);
                }
            };

            const checkIgnore = (user, array) => {
                const { id } = user;
                return Array.isArray(array)
                    ? array.includes(id)
                    : id === array;
            };

            if (!this.client.cooldowns.has(command.name)) {
                this.client.cooldowns.set(command.name, new Collection());
            }
                        
            const now = Date.now();
            const timestamps = this.client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || this.client.defaultCooldown) * 1000;
    
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the **${command.name}** command.`);
                }
            }

            if (this.client.defaultCooldown > 0 && !checkIgnore(message.author, this.client.ignoreCooldowns)) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }

            if ((command.memberPermissions && command.memberPermissions.length) && !checkIgnore(message.author, this.client.ignorePermissions)) {
                if (!Array.isArray(command.memberPermissions)) throw new TypeError(`Akago: Command '${commandName}' memberPermissions need to be an array`);
                checkValidPermission(command.memberPermissions);
                if (command.memberPermissions.some(perm => !message.member.hasPermission(perm))) {
                    const formattedMemberPermissions = command.memberPermissions.map(perm => `**${perm.toLowerCase().replace(/_/g, ' ')}**`).join(', ');
                    return message.channel.send(`Your missing the ${formattedMemberPermissions} permission(s) you need to execute this command.`);
                }
            }

            if (command.clientPermissions && command.clientPermissions.length) {
            if (!Array.isArray(command.clientPermissions)) throw new TypeError(`Akago: Command '${commandName}' clientPermissions need to be an array`);
            checkValidPermission(command.clientPermissions);
            if (command.clientPermissions.some(perm => !message.guild.me.hasPermission(perm))) {
                    const formattedClientPermissions = command.clientPermissions.map(perm => `**${perm.toLowerCase().replace(/_/g, ' ')}**`).join(', ');
                    return message.channel.send(`I'm missing the ${formattedClientPermissions} permissions(s) I need to execute this command.`);
                }
            }

            if (command.ownerOnly && !this.client.isOwner(message.author)) return message.channel.send('This command can only be executed by the owner(s) of this bot.');

            try {
                command.execute(message, args);
            }
            catch (error) {
                console.log(`There was an error while executing a command: ${error}`);
            }
        }
    }
}; 
/**
 * @typedef {Object} commandHandlerOptions
 * @prop {string} commandDirectory - File path to command directory.
 * @prop {string|Array} prefix - Prefixes for the command handler.
 * @prop {boolean} [allowMentionPrefix=true] - Allows mentioning the bot as a valid prefix.
 * @prop {boolean} [blockBots=true] - Command handler will block message's from bots.
 * @prop {boolean} [blockClient=true] - Command handler will block message's from the client.
 * @prop {Array.<Snowflake>} [ignorePermissions=[]] - Array of user's IDs that will ignore permission checks.
 * @prop {Array.<Snowflake>} [ignoreCooldown=[]] - Array of user's IDs that will ignore command cooldowns.
 * @prop {number} [defaultCooldown=3] - Default cooldown of commands that don't have their own cooldown. Set to 0 for no default cooldown.
 */

const CommandBase = require('./Command.js');
const { Collection, Permissions } = require('discord.js');
const { CommandHandlerEvents } = require('../../util/Constants.js');
const Events = require('events');
const glob = require('glob');
const path = require('path');

class CommandHandler extends Events {
    /**
     * Loads commands and handles messages.
     * @param {AkagoClient} client - The Akago Client.
     * @param {commandHandlerOptions} options - Options for the command handler.
     */
    constructor(client, {
        commandDirectory,
        prefix = '!',
        allowMentionPrefix = true,
        blockBots = true,
        blockClient = true,
        ignorePermissions = [],
        ignoreCooldown = [],
        defaultCooldown = 3,
    } = {}) {
        super();

        this.client = client;
        if (!commandDirectory || typeof commandDirectory !== 'string') {
            throw new Error('Akago: commandHandlerOptions commandDirectory either is missing or is not a string.');
        }

        /**
         * Directory to commands.
         * @type {string}
         */
        this.commandDirectory = path.resolve(commandDirectory);
        /**
         * Default command prefix(es)
         * @type {string|Array<string>}
         */
        this.prefix = prefix;
        /**
         * Allows mentioning the bot as a valid prefix.
         * @type {boolean}
         */
        this.allowMentionPrefix = Boolean(allowMentionPrefix);

        /**
         * Command handler will block message's from bots.
         * @type {boolean}
         */
        this.blockBots = Boolean(blockBots);

        /**
         * Command handler will block message's from the client.
         * @type {boolean}
         */
        this.blockClient = Boolean(blockClient);

        /**
         * Array of user's IDs that will ignore permission checks.
         * @type {Array.<Snowflake>}
         */
        this.ignorePermissions = Array.isArray(ignorePermissions) ? ignorePermissions : [];

        /**
         * Array of user's IDs that will ignore command cooldowns.
         * @type {Array.<Snowflake>}
         */
        this.ignoreCooldown = Array.isArray(ignoreCooldown) ? ignoreCooldown : [];

        /**
         * Default cooldown of commands that don't have their own cooldown. Set to 0 for no default cooldown.
         * @type {number}
         */
        this.defaultCooldown = Number(defaultCooldown);

        const commandPaths = glob.sync(`${this.commandDirectory}**/*`);
        for (const commandPath of commandPaths) {
            this.loadCommand(commandPath);
        }

        this.client.on('message', (message) => {
            this.handle(message);
        });
    }

    /**
     * Loads a Command.
     * @param {string} filepath Path to file.
     */
    loadCommand(filepath) {
        if (!filepath) throw new Error('Akago: Tried to load a command but no file path was provided.');
        const { name } = path.parse(filepath);
        const File = require(filepath);
        if (!this.client.util.isClass(File)) throw new Error(`Akago: Command '${name}' doesn't export a class.`);
        const command = new File(this.client, name.toLowerCase());
        if (!(command instanceof CommandBase)) throw new Error(`Akago: Command '${command.name}' name dosn't extend the command base.`);
        if (this.client.commands.has(command.name)) throw new Error(`Akago: Command '${command.name}' already exists.`);
        command.filepath = filepath;
        command.client = this.client;
        this.client.commands.set(command.name, command);
        if (command.aliases.length) {
            for (const alias of command.aliases) {
                this.client.aliases.set(alias, command.name);
            }
        }
    }

    /**
     * Reloads a command.
     * @param {string} name - Name of the command.
     */
    reloadCommand(name) {
        const command = this.client.commands.get(name);
        if (!command) throw new Error(`Akago: commandHandler reloadCommand ${name} isn't a command`);
        delete require.cache[require.resolve(command.filepath)];
        this.client.commands.delete(command.name);
        this.loadCommand(command.filepath);
    }

    /**
     * Handlers messages.
     * @param {Discord.Message} message - Message to hanle. 
     */
    handle(message) {
        if (message.author.id === this.client.user.id && this.blockClient) return; 
        if (message.author.bot && this.blockBots) return;
        
        const mentionedPrefix = RegExp(`^<@!?${this.client.user.id}> `);
    
        const commandPrefix = this.allowMentionPrefix && message.content.match(mentionedPrefix) ?
            mentionedPrefix.match[0] : Array.isArray(this.prefix) ? 
            this.prefix.find(pre => message.content.startsWith(pre)) : this.prefix;
    
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
                    const timeLeft = expirationTime - now;
                    return this.emit(CommandHandlerEvents.COOLDOWN, message, timeLeft, command);
                }
            }

            if (!checkIgnore(message.author, this.client.ignoreCooldowns)) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }

            if (command.memberPermissions.length && !checkIgnore(message.author, this.client.ignorePermissions)) {
                checkValidPermission(command.memberPermissions);
                if (command.memberPermissions.some(perm => !message.member.hasPermission(perm))) {
                    const missingPerms = command.memberPermissions.filter(perm => !message.member.hasPermission(perm));
                    return this.emit(CommandHandlerEvents.MISSING_MEMBER_PERMISSIONS, message, missingPerms, command);
                }
            }

            if (command.clientPermissions && command.clientPermissions.length) {
            checkValidPermission(command.clientPermissions);
            if (command.clientPermissions.some(perm => !message.guild.me.hasPermission(perm))) {
                    const missingPerms = command.clientPermissions.filter(perm => !message.guild.me.hasPermission(perm));     
                    return this.emit(CommandHandlerEvents.MISSING_CLIENT_PERMISSIONS, message, missingPerms, command);
                }
            }

            if (command.ownerOnly && !this.client.isOwner(message.author)) return message.channel.send('This command can only be executed by the owner(s) of this bot.');
            if (command.guildOnly && message.channel.type === 'dm') return message.channel.send('I can\'t execute this command in DMS make sure you use this in a guild.');
            if (command.nsfw && !message.channel.nsfw) return message.channel.send('I can\'t execute this command as this channel is not NSFW.');

            try {
                command.execute(message, args);
            }
            catch (error) {
                console.log(`There was an error while executing a command: ${error}`);
            }
        }
    }

}

module.exports = CommandHandler;
const { Client, Collection } = require('discord.js');
const listenerRegistry = require('./registries/listenerRegistry');
const commandRegistry = require('./registries/commandRegistry');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', token = '', prefix = '!', listenerDirectory = '', commandHandler } = options;
        const { 
            /**
             * Whether mentioning the bot can be used as a prefix
             * @type {Boolean}
             */
            allowMentionPrefix = true,
            /**
             * Whether or not to use Akago default listeners
             * @type {Boolean}
             */
            useAkagoMessageListener = true,
            /**
             * Whether or not Akago default message listener should block bots
             * @type {Boolean}
             */
            blockBots = true,
        } = commandHandler.handlerOptions || {};

        if (!ownerID || !Array.isArray(ownerID)) throw new TypeError('Akago Client \'ownerID\' option is either missing or not an Array.');
        if (!token || typeof token !== 'string') throw new TypeError('Akago Client \'token\' option is either missing or not a string.');
        if (commandHandler && (!commandHandler.commandDirectory || typeof commandHandler.commandDirectory !== 'string')) throw new TypeError('Akago Client commandHandler does not have a \'commandDirectory\' value or its not a string.');
        if ((commandHandler && commandHandler.handlerOptions)) {
            if (typeof allowMentionPrefix !== 'boolean') throw new TypeError('Akago Client commandHandler handlerOptions \'allowMentionPrefix\' needs to be a boolean.');
            if (typeof useAkagoMessageListener !== 'boolean') throw new TypeError('Akago Client commandHandler handlerOptions \'useAkagoMessageListener\' needs to be a boolean.');
            if (typeof blockBots !== 'boolean') throw new TypeError('Akago Client commandHandler handlerOptions \'blockBots\' needs to be a boolean.');
        }

        this.commands = new Collection();

        this.aliases = new Collection();

        /**
         * The ID of the owner(s).
         * @type {Snowflake|Snowflake[]}
         */
        this.ownerID = ownerID;

        /**
         * Your discord bot token.
         * @type {String}
         */
        this.token = token;

        /**
         * Your discord bot's prefix
         * @type {String}
         */
        this.prefix = prefix;

        /**
         * Your file path to your listeners folder
         * @type {String}
         */
        this.listenerDirectory = listenerDirectory;

        /**
         * Your file path to your commands folder
         * @type {String}
         */
        this.commandDirectory = commandHandler.commandDirectory;

        if (useAkagoMessageListener) {
            this.on('message', message => {
                if (message.author.bot && blockBots) return;
        
                const mentionedPrefix = RegExp(`^<@!?${this.user.id}> `);
    
                const commandPrefix = allowMentionPrefix ? message.content.match(mentionedPrefix) ?
                    message.content.match(mentionedPrefix)[0] : this.prefix : this.prefix;
    
                if (!message.content.startsWith(commandPrefix)) return;
    
                const [commandName, ...args] = message.content.slice(commandPrefix.length).trim().split(/ +/g); 
    
                const command = this.commands.get(commandName)
                    || this.commands.get(this.aliases.get(commandName));
    
                if (!command) return;
    
                try {
                    command.execute(message, args);
                }
                catch (error) {
                    console.log(`There was an error while executing a command: ${error}`);
                }
            });
        }
    }

    /**
     * Checks if the user is the ownner of this bot.
     * @param {UserResolvable} user - User to check 
     * @returns {boolean}
     */
    isOwner(user) {
        const id = this.users.resolveID(user);
        return Array.isArray(this.ownerID)
            ? this.ownerID.includes(id)
            : id === this.ownerID;
    }

    /**
     * Logs the Akago Client in and loads events and commands
     */
    login() {
        super.login(this.token);
        listenerRegistry(this);
        commandRegistry(this);
        console.log('Yoo the bots ready!');
    }
};
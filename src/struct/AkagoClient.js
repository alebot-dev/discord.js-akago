const { Client, Collection } = require('discord.js');
const listenerRegistry = require('./registries/listenerRegistry');
const commandRegistry = require('./registries/commandRegistry');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', token = '', prefix = '!', listenerHandler, commandHandler } = options;
        const { allowMentionPrefix = true, blockBots = true, blockClient = true, ignorePermissions = [], ignoreCooldowns = [], defaultCooldown = 3 } = commandHandler.handlerOptions || {};
        const { useAkagoMessageListener = true, akagoLogReady = true } = listenerHandler.handlerOptions || {};

        if (!ownerID || (typeof ownerID !== 'string' && !Array.isArray(ownerID))) throw new TypeError('Akago Client \'ownerID\' option is either missing or not an Array.');
        if (!token || typeof token !== 'string') throw new TypeError('Akago Client \'token\' option is either missing or not a string.');
        if (commandHandler && (!commandHandler.commandDirectory || typeof commandHandler.commandDirectory !== 'string')) throw new TypeError('Akago Client commandHandler does not have a \'commandDirectory\' value or its not a string.');
        if (!Array.isArray(prefix) && typeof prefix !== 'string') throw new TypeError('Akago Client \'prefix\' option needs to be a string or an array.');
        if (Array.isArray(prefix) && !prefix.length) throw new TypeError('Akago Client \'prefix\' option has no array length.');

        if (commandHandler && commandHandler.handlerOptions) {
            if (typeof allowMentionPrefix !== 'boolean') throw new TypeError('Akago Client commandHandlerOptions \'allowMentionPrefix\' needs to be a boolean.');
            if (typeof akagoLogReady !== 'boolean') throw new TypeError('Akago Client listenerHandlerOptions \'akagoLogReady\' needs to be a boolean');
            if (typeof blockBots !== 'boolean') throw new TypeError('Akago Client commandHandlerOptions \'blockBots\' needs to be a boolean.');
            if (typeof defaultCooldown !== 'number') throw new TypeError('Akago Client commandHandlerOptions \'defaultCooldown\' needs to be a number.');
            if (!Array.isArray(ignoreCooldowns) && typeof ignoreCooldowns !== 'string') throw new TypeError('Akago Client commandHandlerOptions \'ignoreCooldowns\' needs to be either Snowflake|Snowflake[]');
            if (!Array.isArray(ignorePermissions) && typeof ignorePermissions !== 'string') throw new TypeError('Akago Client commandHandlerOptions \'ignorePermissions\' needs to be either Snowflake|Snowflake[]');
        }

        if (listenerHandler && listenerHandler.listenerOptions) {
            if (typeof useAkagoMessageListener !== 'boolean') throw new TypeError('Akago Client listenerHandlerOptions \'useAkagoMessageListener\' needs to be a boolean.');
            if (typeof akagoLogReady !== 'boolean') throw new TypeError('Akago Client listenerHandlerOptions \'akagoLogReady\' needs to be a boolean.');
        }

        this.commands = new Collection();

        this.aliases = new Collection();

        this.cooldowns = new Collection();

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
        this.listenerDirectory = listenerHandler.listenerDirectory;

        /**
         * Your file path to your commands folder
         * @type {String}
         */
        this.commandDirectory = commandHandler.commandDirectory;

        if (this.commandDirectory) {
            /**
             * Whether mentioning the bot can be used as a prefix
             * @type {Boolean}
             */
            this.allowMentionPrefix = allowMentionPrefix;
            /**
             * Whether or not Akago default message listener should block bots
             * @type {Boolean}
             */
            this.blockBots = blockBots;
            /**
             * Whether or not Akago default message listener should block the client
             * @type {Boolean}
             */
            this.blockClient = blockClient;
            /**
             * Members who will ignore permission checks
             * @type {Snowflake|Snowflake[]}
             */
            this.ignorePermissions = ignorePermissions;
            /**
             * Members who will ignore cooldown checks
             * @type {Snowflake|Snowflake[]}
             */
            this.ignoreCooldowns = ignoreCooldowns;
            /**
             * Default cooldown of commands that don't have specific cooldowns
             * Use 0 to have no default coodown
             * @type {Number}
             */
            this.defaultCooldown = defaultCooldown;

            require('./listeners/registry/listenerRegistry.js')(this, `${__dirname}/listeners/message.js`);
        }

        if (this.listenerDirectory) {
            /**
             * Whether or not to use Akago default message listener
             * @type {Boolean}
             */
            this.useAkagoMessageListener = useAkagoMessageListener;
            /**
             * Whether or not to use Akago default ready listener
             * @type {Boolean}
             */
            this.akagoLogReady = akagoLogReady;
            
            if (akagoLogReady) require('./listeners/registry/listenerRegistry.js')(this, `${__dirname}/listeners/ready.js`);
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
    }
};
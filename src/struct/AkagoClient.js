const { Client, Collection } = require('discord.js');
const listenerRegistry = require('./registries/listenerRegistry.js');
const commandRegistry = require('./registries/commandRegistry.js');
const Util = require('./util/ClientUtil.js');
const validateAkagoOptions = require('./util/validateAkagoOptions.js');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', 
                token = '', 
                prefix = '!',
                listenerHandler, 
                commandHandler,
            } = options;

        const { allowMentionPrefix = true, 
                blockBots = true, 
                blockClient = true,
                ignorePermissions = [], 
                ignoreCooldowns = [], 
                defaultCooldown = 3,
                useAkagoHelpCommand = true, 
                miscCommandCategory = 'Misc',
            } = commandHandler.handlerOptions || {};

        const { 
                useAkagoMessageListener = true, 
                akagoLogReady = true,
            } = listenerHandler.handlerOptions || {};

        validateAkagoOptions(options);

        this.commands = new Collection();

        this.aliases = new Collection();

        this.cooldowns = new Collection();

        this.util = new Util(this);

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
            /**
             * Whether or not the client uses Akago default help command
             * @type {Boolean}
             */
            this.useAkagoHelpCommand = useAkagoHelpCommand;
            /**
             * Misc category for commands that don't have a category
             * @type {String}
             */
            this.miscCommandCategory = miscCommandCategory;

            if (this.useAkagoHelpCommand) require('./commands/registry/commandRegistry')(this, `${__dirname}/commands/help.js`, defaultCooldown);
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
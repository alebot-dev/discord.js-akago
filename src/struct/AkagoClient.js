const { Client, Collection } = require('discord.js');
const Util = require('./ClientUtil.js');

/**
 * Options used to determine how the framework behaves.
 * @typedef {Object} AkagosOptions
 * @prop {Snowflake|Array<Snowflake>} ownerID - Discord ID of the client owner(s).
 * @prop {string} token - Discord bot's token.
 * @prop {string|Array<string>} prefix='!' - Default command prefix(es)
 * @prop {string} [commandDirectory] - Directory to commands from the main project folder.
 * @prop {string} [listenerDirectory] - Directory to listeners from the main project folder.
 */

class AkagoClient extends Client {
    /**
     * The Akago framework client.
     * Creates the handlers and sets them up.
     * @param {AkagosOptions} options - Options to use for the framework.
     * @param {ClientOptions} [clientOptions] - Options for Discord JS client.
     */
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        /**
         * Collection of all loaded commands.
         * @type {Collection}
         */
        this.commands = new Collection();

        /**
         * Collection of all aliases
         * @type {Collection}
         */
        this.aliases = new Collection();

        /**
         * Collection of all cooldowns
         * @type {Collection}
         */
        this.cooldowns = new Collection();

        /**
         * Utility methods.
         * @type {ClientUtil}
         */
        this.util = new Util(this);

        /**
         * Discord ID of the client owner(s).
         * @type {Snowflake|Array<Snowflake>}
         */
        this.ownerID = typeof options.ownerID === 'string' ? options.ownerID : [];
        /**
         * Discord bot's token.
         * @type {string}
         */
        this.token = typeof options.token === 'string' ? options.token : '';
        /**
         * Default command prefix(es)
         * @type {string|Array<string>}
         */
        this.prefix = typeof options.prefix === 'string' ? options.prefix : '!';
        /**
         * Directory of listener folder.
         * @type {string}
         */
        this.listenerDirectory = typeof options.listenerDirectory === 'string' ? options.listenerDirectory : '';
        /**
         * Directory of commands folder.
         * @type {string}
         */
        this.commandDirectory = typeof options.commandDirectory === 'string' ? options.commandDirectory : '';
    }

    /**
     * Checks if the user is the ownner of this bot.
    *  @param {UserResolvable} user - User to check 
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
    build() {
        if (!this.token) throw new Error('Akago: client options, no token was provided.');
        super.login(this.token).catch(err => { throw new Error(`Akago: client token option is invalid: ${err}`); });
        console.log('Yoo its ready!');
    }
}

module.exports = AkagoClient;
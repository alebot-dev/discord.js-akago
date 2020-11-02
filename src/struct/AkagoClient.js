const { Client } = require('discord.js');
const listenerHandler = require('./listeners/listenerHandler.js');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', token = '', prefix = '!', listenerDirectory = '' } = options;

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
    }

    login() {
        super.login(this.token);
        listenerHandler(this);
    }
};
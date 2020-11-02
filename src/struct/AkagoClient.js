const { Client } = require('discord.js');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', token = '', prefix = '!' } = options;

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
    }

    login() {
        super.login(this.token);
    }
};
const { Client } = require('discord.js');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '' } = options;

        /**
         * The ID of the owner(s).
         * @type {Snowflake|Snowflake[]}
         */
        this.ownerID = ownerID;
    }

    /**
     * Checks if a user is the owner of this bot.
     * @param {UserResolvable} user - User to check.
     * @returns {boolean}
     */
    isOwner(user) {
        const id = this.users.resolveID(user);
        return Array.isArray(this.ownerID)
            ? this.ownerID.includes(id)
            : id === this.ownerID;
    }
};
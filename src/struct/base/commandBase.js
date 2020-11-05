module.exports = class Command {

    constructor(client, name, options = {}) {
        /**
         * Discord Akago Framework Client
         * @type {Object}
         */
        this.client = client;
        /**
         * The name of the command
         * @type {String}
         */
        this.name = options.name || name;
        /**
         * Breif description of the command
         * @type {String}
         */
        this.description = options.description || null;
        /**
         * Usage of the command
         * @type {String}
         */
        this.usage = options.usage || null;
        /**
         * Collection of aliases for the command
         * @type {Array}
         */
        this.aliases = options.aliases || [];
        /**
         * The category for the command
         * @type {String}
         */
        this.category = options.category || null;
        /**
         * The cooldown of a command in seconds
         * @type {Number}
         */
        this.cooldown = options.cooldown || null;
        /**
         * Only allows usr's in the ownerID collection in Akago Client option to use the command
         * @type {Boolean}
         */
        this.ownerOnly = options.ownerOnly || false;
        /**
         * Collection of permissions the member requires
         * @type {Array}
         */
        this.memberPermissions = options.memberPermissions || [];
        /**
         * Collection of permissions the client requires
         * @type {Array}
         */
        this.clientPermissions = options.clientPermissions || [];
    }

}; 
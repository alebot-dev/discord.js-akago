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
        this.name = typeof options.name === 'string' ? options.name : name;
        /**
         * Breif description of the command
         * @type {String}
         */
        this.description = typeof options.description === 'string' ? options.description : null;
        /**
         * Usage of the command
         * @type {String}
         */
        this.usage = typeof options.usage === 'string' ? options.usage : null;
        /**
         * Collection of aliases for the command
         * @type {Array}
         */
        this.aliases = Array.isArray(options.aliases) ? options.aliases : [];
        /**
         * Examples of the usage of the command
         * @type {String|Array}
         */
        this.examples = (Array.isArray(options.examples) || typeof options.examples === 'string') ? options.examples : [];
        /**
         * The category for the command
         * @type {String}
         */
        this.category = typeof options.category === 'string' ? options.category : null;
        /**
         * The cooldown of a command in seconds
         * @type {Number}
         */
        this.cooldown = typeof options.cooldown === 'number' ? options.cooldown : null;
        /**
         * Only allows usr's in the ownerID collection in Akago Client option to use the command
         * @type {Boolean}
         */
        this.ownerOnly = typeof options.ownerOnly === 'boolean' ? options.ownerOnly : false;
        /**
         * Only allowing commands to be executed in guilds not dms
         * @type {Boolean}
         */
        this.guildOnly = typeof options.guildOnly === 'boolean' ? (options.guildOnly === undefined ? true : options.guildOnly) : true;
        /**
         * Won't send a message if true and the message channel isn't NSFW
         * @type {Boolean}
         */
        this.nsfw = typeof options.nsfw === 'boolean' ? options.nsfw : false;
        /**
         * Collection of permissions the member requires
         * @type {Array}
         */
        this.memberPermissions = Array.isArray(options.memberPermissions) ? options.memberPermissions : [];
        /**
         * Collection of permissions the client requires
         * @type {Array}
         */
        this.clientPermissions = Array.isArray(options.clientPermissions) ? options.clientPermissions : [];
    }

}; 
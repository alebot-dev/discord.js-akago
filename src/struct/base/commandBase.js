/**
 * Options to use for command execution behavior.
 * @typedef {Object} CommandOptions
 * @prop {string} [name=file name] - Name of the command
 * @prop {string} [description=''] - Description of the command.
 * @prop {string} [usage=''] - The usage of the command.
 * @prop {string|Array} [examples=[]] - Any exmaples of the command.
 * @prop {string} [aliases=[]] - Aliases of the command.
 * @prop {string} [category='Misc'] - Category for the command.
 * @prop {boolean} [ownerOnly=false] - Whether or not to allow client owner(s) only.
 * @prop {number} [cooldown=3] - The command cooldown in seconds.
 * @prop {PermissionResolvable[]} [memberPermissions] - Permissions required by the member to run this command.
 * @prop {PermissionResolvable[]} [clientPermissions] - Permissions required by the client to run this command.
 * @prop {boolean} [guildOnly=true] - Whether or not the commans can only be used in a guild
 * @prop {boolean} [nsfw=false] - Whether the command can only be done in a NSFW channel. 
 */

 class Command {
    /**
     * Creates a new command.
     * @param {string} name=File name - Command name if isn't provided in CommandOptions.
     * @param {AkagoClient} client - The Akago Client.
     * @param {CommandOptions} [options={}] - Options for the command.
     */
    constructor(client, name, options = {}) {
        this.client = client;
        /**
         * Name of the command
         * @type {string}
         */
        this.name = typeof options.name === 'string' ? options.name : name;
        /**
         * Description of the command.
         * @type {string}
         */
        this.description = typeof options.description === 'string' ? options.description : null;
        /**
         * The usage of the command.
         * @type {string}
         */
        this.usage = typeof options.usage === 'string' ? options.usage : null;
        /**
         * Aliases of the command.
         * @type {Array}
         */
        this.aliases = Array.isArray(options.aliases) ? options.aliases : [];
        /**
         * Any exmaples of the command.
         * @type {string|Array}
         */
        this.examples = (Array.isArray(options.examples) || typeof options.examples === 'string') ? options.examples : [];
        /**
         * Category for the command.
         * @type {string}
         */
        this.category = typeof options.category === 'string' ? options.category : null;
        /**
         * The command cooldown in seconds.
         * @type {number}
         */
        this.cooldown = typeof options.cooldown === 'number' ? options.cooldown : null;
        /**
         * Whether or not to allow client owner(s) only.
         * @type {boolean}
         */
        this.ownerOnly = typeof options.ownerOnly === 'boolean' ? options.ownerOnly : false;
        /**
         * Whether or not the commans can only be used in a guild
         * @type {boolean}
         */
        this.guildOnly = typeof options.guildOnly === 'boolean' ? (options.guildOnly === undefined ? true : options.guildOnly) : true;  
        /**
         * Whether the command can only be done in a NSFW channel. 
         * @type {boolean}
         */
        this.nsfw = typeof options.nsfw === 'boolean' ? options.nsfw : false;
        /**
         * Permissions required by the member to run this command.
         * @type {PermissionResolvable[]}
         */
        this.memberPermissions = Array.isArray(options.memberPermissions) ? options.memberPermissions : [];
        /**
         * Permissions required by the client to run this command.
         * @type {PermissionResolvable[]}
         */
        this.clientPermissions = Array.isArray(options.clientPermissions) ? options.clientPermissions : [];
    }

}

module.exports = Command;
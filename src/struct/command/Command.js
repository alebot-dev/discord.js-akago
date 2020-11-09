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
     * @param {string} name - Name of the command.
     * @param {CommandOptions} [options={}] - Options for the command.
     */
    constructor(name, options = {}) {
        /**
         * Name of the command
         * @type {string}
         */
        this.name = String(name);
        /**
         * Description of the command.
         * @type {string}
         */
        this.description = String(options.description);
        /**
         * Aliases of the command.
         * @type {Array}
         */
        this.aliases = Array.isArray(options.aliases) ? options.aliases : [];
        /**
         * Category for the command.
         * @type {string}
         */
        this.category = String(options.category);
        /**
         * The command cooldown in seconds.
         * @type {number}
         */
        this.cooldown = Number(options.cooldown);
        /**
         * Whether or not to allow client owner(s) only.
         * @type {boolean}
         */
        this.ownerOnly = Boolean(options.ownerOnly);
        /**
         * Whether or not the commans can only be used in a guild
         * @type {boolean}
         */
        this.guildOnly = Boolean(options.guildOnly);
        /**
         * Whether the command can only be done in a NSFW channel. 
         * @type {boolean}
         */
        this.nsfw = Boolean(options.nsfw);
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
        /**
         * The Akago Client.
         * @type {AkagoClient}
         */
        this.client;
    }

}

module.exports = Command;
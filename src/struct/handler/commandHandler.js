/**
 * @typedef {Object} commandHandlerOptions
 * @prop {boolean} [allowMentionPrefix=true] - Allows mentioning the bot as a valid prefix.
 * @prop {boolean} [blockBots=true] - Command handler will block message's from bots.
 * @prop {boolean} [blockClient=true] - Command handler will block message's from the client.
 * @prop {Array.<Snowflake>} [ignorePermissions=[]] - Array of user's IDs that will ignore permission checks.
 * @prop {Array.<Snowflake>} [ignoreCooldown=[]] - Array of user's IDs that will ignore command cooldowns.
 * @prop {number} [defaultCooldown=3] - Default cooldown of commands that don't have their own cooldown. Set to 0 for no default cooldown.
 * @prop {boolean} [useAkagoHelpCommand=true] - Whether or not to use Akagos default help command.
 * @prop {string} [miscCommandCategory='Misc'] - Name of the category for commands that don't have their own category.
 */

const CommandBase = require('../base/commandBase.js');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const path = require('path');

class CommandHandler {
    /**
     * Loads commands and handles messages.
     * @param {AkagoClient} client - The Akago Client.
     * @param {commandHandlerOptions} [options={}] - Options for the command handler.
     */
    constructor(client, options = {}) {
        this.client = client;
        
        /**
         * Allows mentioning the bot as a valid prefix.
         * @type {boolean}
         */
        this.client.allowMentionPrefix = typeof options.allowMentionPrefix === 'boolean' ? options.allowMentionPrefix : true;

        /**
         * Command handler will block message's from bots.
         * @type {boolean}
         */
        this.client.blockBots = typeof options.blockBots === 'boolean' ? options.blockBots : true;

        /**
         * Command handler will block message's from the client.
         * @type {boolean}
         */
        this.client.blockClient = typeof options.blockClient === 'boolean' ? options.blockClient : true;

        /**
         * Array of user's IDs that will ignore permission checks.
         * @type {Array.<Snowflake>}
         */
        this.client.ignorePermissions = Array.isArray(options.ignorePermissions) ? options.ignorePermissions : [];

        /**
         * Array of user's IDs that will ignore command cooldowns.
         * @type {Array.<Snowflake>}
         */
        this.client.ignoreCooldown = Array.isArray(options.ignoreCooldown) ? options.ignoreCooldown : [];

        /**
         * Default cooldown of commands that don't have their own cooldown. Set to 0 for no default cooldown.
         * @type {number}
         */
        this.client.defaultCooldown = typeof options.defaultCooldown === 'number' ? options.defaultCooldown : 3;

        /**
         * Whether or not to use Akagos default help command.
         * @type {number}
         */
        this.client.useAkagoHelpCommand = typeof options.useAkagoHelpCommand === 'boolean' ? options.useAkagoHelpCommand : true;

        /**
         * Name of the category for commands that don't have their own category.
         * @type {string}
         */
        this.client.miscCommandCategory = typeof options.miscCommandCategory === 'string' ? options.miscCommandCategory : 'Misc';

        this.loadCommands();
        this.loadMessageEvent(path.join(__dirname, '..', 'listeners/message.js'));
    }

    loadCommands() {
        if (!this.client.commandDirectory || typeof this.client.commandDirectory !== 'string') {
            throw new Error('Akago: clientOptions commandDirectory either is missing or is not a string.');
        }

        glob(`${process.cwd()}${this.client.commandDirectory}/**/*.js`).then(commands => {
            if (this.client.useAkagoHelpCommand) commands.push(path.join(__dirname, '..', '/commands/help.js'));
            for (const commandFile of commands) {
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.client.util.isClass(File)) throw new TypeError(`Akago: Command '${name}' doesn't export a class.`);
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof CommandBase)) throw new TypeError(`Akago: Command '${command.name}' name dosn't extend the command base.`);
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name);
                    }
                }
            }
        });
    }

    loadMessageEvent(listenerFile) {
        const { name } = path.parse(listenerFile);
        const File = require(listenerFile);
        const listener = new File(this.client, name.toLowerCase());
        listener.emitter[listener.type]((listener.name || name), (...args) => listener.execute(...args));
    }

}

module.exports = CommandHandler;
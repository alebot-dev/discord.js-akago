const { Client, Collection } = require('discord.js');
const listenerHandler = require('./registries/listenerRegistry');
const commandHandler = require('./registries/commandRegistry');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', token = '', prefix = '!', listenerDirectory = '', commandDirectory = '' } = options;

        this.commands = new Collection();

        this.aliases = new Collection();

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

        /**
         * Your file path to your commands folder
         * @type {String}
         */
        this.commandDirectory = commandDirectory;

        this.on('message', message => {
            const mentionedPrefix = RegExp(`^<@!?${this.user.id}> `);

            const commandPrefix = message.content.match(mentionedPrefix) ?
                message.content.match(mentionedPrefix)[0] : this.prefix;

            if (!message.content.startsWith(commandPrefix)) return;

            const [commandName, ...args] = message.content.slice(commandPrefix.length).trim().split(/ +/g); 

            const command = this.commands.get(commandName)
                || this.commands.get(this.aliases.get(commandName));

            if (!command) return;

            try {
                command.execute(message, args);
            }
            catch (error) {
                console.log(`There was an error while executing a command: ${error}`);
            }
        });
    }

    login() {
        super.login(this.token);
        listenerHandler(this);
        commandHandler(this);
        console.log('Yoo the bots ready!');
    }
};
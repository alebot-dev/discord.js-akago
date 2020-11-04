const { Client, Collection, Permissions } = require('discord.js');
const listenerRegistry = require('./registries/listenerRegistry');
const commandRegistry = require('./registries/commandRegistry');

module.exports = class AkairoClient extends Client {
    constructor(options = {}, clientOptions) {
        super(clientOptions || options);

        const { ownerID = '', token = '', prefix = '!', listenerDirectory = '', commandHandler } = options;
        const { 
            /**
             * Whether mentioning the bot can be used as a prefix
             * @type {Boolean}
             */
            allowMentionPrefix = true,
            /**
             * Whether or not to use Akago default listeners
             * @type {Boolean}
             */
            useAkagoMessageListener = true,
            /**
             * Whether or not Akago default message listener should block bots
             * @type {Boolean}
             */
            blockBots = true,
            /**
             * Whether or not Akago default message listener should block the client
             * @type {Boolean}
             */
            blockClient = true,
            /**
             * Members who will ignore permission checks
             * @type {Snowflake|Snowflake[]}
             */
            ignorePermissions = [],
            /**
             * Members who will ignore cooldown checks
             * @type {Snowflake|Snowflake[]}
             */
            ignoreCooldowns = [],
            /**
             * Default cooldown of commands that don't have specific cooldowns
             * Use 0 to have no default coodown
             * @type {Number}
             */
            defaultCooldown = 3,
        } = commandHandler.handlerOptions || {};

        if (!ownerID || !Array.isArray(ownerID)) throw new TypeError('Akago Client \'ownerID\' option is either missing or not an Array.');
        if (!token || typeof token !== 'string') throw new TypeError('Akago Client \'token\' option is either missing or not a string.');
        if (commandHandler && (!commandHandler.commandDirectory || typeof commandHandler.commandDirectory !== 'string')) throw new TypeError('Akago Client commandHandler does not have a \'commandDirectory\' value or its not a string.');
        if ((commandHandler && commandHandler.handlerOptions)) {
            if (typeof allowMentionPrefix !== 'boolean') throw new TypeError('Akago Client commandHandler handlerOptions \'allowMentionPrefix\' needs to be a boolean.');
            if (typeof useAkagoMessageListener !== 'boolean') throw new TypeError('Akago Client commandHandler handlerOptions \'useAkagoMessageListener\' needs to be a boolean.');
            if (typeof blockBots !== 'boolean') throw new TypeError('Akago Client commandHandler handlerOptions \'blockBots\' needs to be a boolean.');
            if (typeof defaultCooldown !== 'number') throw new TypeError('Akago Client commandHandler handlerOptions \'defaultCooldown\' needs to be a number.');
            if (!Array.isArray(ignoreCooldowns) && typeof ignoreCooldowns !== 'string') throw new TypeError('Akago Client commandHandler handlerOptions \'ignoreCooldowns\' needs to be either Snowflake|Snowflake[]');
            if (!Array.isArray(ignorePermissions) && typeof ignorePermissions !== 'string') throw new TypeError('Akago Client commandHandler handlerOptions \'ignorePermissions\' needs to be either Snowflake|Snowflake[]');
        }

        this.commands = new Collection();

        this.aliases = new Collection();

        this.cooldowns = new Collection();

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
        this.commandDirectory = commandHandler.commandDirectory;

        if (useAkagoMessageListener) {
            this.on('message', message => {
                if (message.author.id === this.user.id && blockClient) return; 
                if (message.author.bot && blockBots) return;
        
                const mentionedPrefix = RegExp(`^<@!?${this.user.id}> `);
    
                const commandPrefix = allowMentionPrefix ? message.content.match(mentionedPrefix) ?
                    message.content.match(mentionedPrefix)[0] : this.prefix : this.prefix;
    
                if (!message.content.startsWith(commandPrefix)) return;
    
                const [commandName, ...args] = message.content.slice(commandPrefix.length).trim().split(/ +/g); 
    
                const command = this.commands.get(commandName)
                    || this.commands.get(this.aliases.get(commandName));
    
                if (command) {
                    const checkValidPermission = (permArr) => {
                        if (permArr.some(perm => !(Object.keys(Permissions.FLAGS)).includes(perm))) {
                            throw new TypeError(`Akago: Command '${commandName}' has invalid client or member permissions.`);
                        }
                    };

                    const checkIgnore = (user, array) => {
                        const id = this.users.resolveID(user);
                        return Array.isArray(array)
                            ? array.includes(id)
                            : id === array;
                    };

                    if (!this.cooldowns.has(command.name)) {
                        this.cooldowns.set(command.name, new Collection());
                    }
                        
                    const now = Date.now();
                    const timestamps = this.cooldowns.get(command.name);
                    const cooldownAmount = (command.cooldown || defaultCooldown) * 1000;
    
                    if (timestamps.has(message.author.id)) {
                        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                    
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the **${command.name}** command.`);
                        }
                    }

                    if (defaultCooldown > 0 && !checkIgnore(message.author, ignoreCooldowns)) {
                        timestamps.set(message.author.id, now);
                        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                    }

                    if ((command.memberPermissions && command.memberPermissions.length) && !checkIgnore(message.author, ignorePermissions)) {
                        if (!Array.isArray(command.memberPermissions)) throw new TypeError(`Akago: Command '${commandName}' memberPermissions need to be an array`);
                        checkValidPermission(command.memberPermissions);
                        if (command.memberPermissions.some(perm => !message.member.hasPermission(perm))) {
                            const formattedMemberPermissions = command.memberPermissions.map(perm => `**${perm.toLowerCase().replace(/_/g, ' ')}**`).join(', ');
                            return message.channel.send(`Your missing the ${formattedMemberPermissions} permission(s) you need to execute this command.`);
                        }
                    }

                    if (command.clientPermissions && command.clientPermissions.length) {
                        if (!Array.isArray(command.clientPermissions)) throw new TypeError(`Akago: Command '${commandName}' clientPermissions need to be an array`);
                        checkValidPermission(command.clientPermissions);
                        if (command.clientPermissions.some(perm => !message.guild.me.hasPermission(perm))) {
                            const formattedClientPermissions = command.clientPermissions.map(perm => `**${perm.toLowerCase().replace(/_/g, ' ')}**`).join(', ');
                            return message.channel.send(`I'm missing the ${formattedClientPermissions} permissions(s) I need to execute this command.`);
                        }
                    }

                    try {
                        command.execute(message, args);
                    }
                    catch (error) {
                        console.log(`There was an error while executing a command: ${error}`);
                    }
                }
            });
        }
    }

    /**
     * Checks if the user is the ownner of this bot.
     * @param {UserResolvable} user - User to check 
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
    login() {
        super.login(this.token);
        listenerRegistry(this);
        commandRegistry(this);
        console.log('Yoo the bots ready!');
    }
};
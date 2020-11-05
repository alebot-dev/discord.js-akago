const CommandBase = require('../base/commandBase.js');
const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

module.exports = (client) => {
    return glob(`${path.dirname(require.main.filename)}${client.commandDirectory}/**/*.js`).then(commands => {
        for (const commandFile of commands) {
            const { name } = path.parse(commandFile);
            const File = require(commandFile);
            if (!client.util.isClass(File)) throw new TypeError(`Akago: Command '${name}' doesn't export a class.`);
            const command = new File(client, name.toLowerCase());
            if (!(command instanceof CommandBase)) throw new TypeError(`Akago: Command '${command.name}' name dosn't extend the command base.`);
            if (command.name && typeof command.name !== 'string') throw new TypeError(`Akago: Command '${command.name}' description needs to be a string.`);
            if (command.description && typeof command.description !== 'string') throw new TypeError(`Akago: Command '${command.name}' needs to be a string.`);
            if (command.usage && typeof command.usage !== 'string') throw new TypeError(`Akago: Command '${command.name}' usage needs to be a string.`);
            if (command.aliases && !Array.isArray(command.aliases)) throw new TypeError(`Akago: Command '${command.name}' aliases need to be an array.`);
            if (command.examples && (!Array.isArray(command.examples) && typeof command.examples !== 'string')) throw new TypeError(`Akago: Command '${command.name}' examples needs to be an array or string`);
            if (command.category && typeof command.category !== 'string') throw new TypeError(`Akago: Command '${command.name}' category needs to be a string.`);
            if (command.cooldown && typeof command.cooldown !== 'number') throw new TypeError(`Akago: Command '${command.name}' cooldown needs to be a number.`);
            if (command.ownerOnly && typeof command.ownerOnly !== 'boolean') throw new TypeError(`Akago: Command '${command.name}' ownerOnly needs to be a boolean.`);
            if (command.guildOnly && typeof command.guildOnly !== 'boolean') throw new TypeError(`Akago: Command '${command.name}' guildOnly needs to be a boolean.`);
            if (command.nsfw && typeof command.nsfw !== 'boolean') throw new TypeError(`Akago: Command '${command.name}' nsfw needs to be a boolean.`);
            if (command.memberPermissions && !Array.isArray(command.memberPermissions)) throw new TypeError(`Akago: Command '${command.name}' memberPermissions needs to be an array.`);           
            if (command.clientPermissions && !Array.isArray(command.clientPermissions)) throw new TypeError(`Akago: Command '${command.name}' clientPermissions needs to be an array.`);
            client.commands.set(command.name, command);
            if (command.aliases.length) {
                for (const alias of command.aliases) {
                    client.aliases.set(alias, command.name);
                }
            }
        }
    });
};
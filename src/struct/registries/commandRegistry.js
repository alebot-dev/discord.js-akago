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
            client.commands.set(command.name, command);
            if (command.aliases.length) {
                for (const alias of command.aliases) {
                    client.aliases.set(alias, command.name);
                }
            }
        }
    });
};
const path = require('path');

module.exports = (client, commandFile) => {
    const { name } = path.parse(commandFile);
    const File = require(commandFile);
    const command = new File(client, name.toLowerCase());
    client.commands.set(command.name, command);
    if (command.aliases.length) {
        for (const alias of command.aliases) {
            client.aliases.set(alias, command.name);
        }
    }
};
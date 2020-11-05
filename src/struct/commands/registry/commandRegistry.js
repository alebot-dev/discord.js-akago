const path = require('path');

module.exports = (client, commandFile, defaultCooldown) => {
    const { name } = path.parse(commandFile);
    const File = require(commandFile);
    const command = new File(client, name.toLowerCase());
    command.cooldown = defaultCooldown;
    client.commands.set(command.name, command);
    if (command.aliases.length) {
        for (const alias of command.aliases) {
            client.aliases.set(alias, command.name);
        }
    }
};
## Help Command
```js
const { Command } = require('discord.js-akago');
const { MessageEmbed } = require('discord.js');

module.exports = class HelpCommand extends Command {
    constructor() {
        super('help', {
            description: 'Display a list of all commands I have.',
            category: 'Utilities',
        });
    }

    async execute(message, [commandName]) {
        const { commands, util } = this.client;
        const embed = new MessageEmbed().setColor('BLUE');
        const command = commands.get(commandName);

        if (command) {
            embed.setTitle(`\`${command.name}\``);
            embed.addField('Description', command.description);
            if (command.aliases.length) {
                embed.addField('Aliases', command.aliases.map(a => `\`${a}\``).join(' '));
            }
        }
        else {
            const categories = util.removeDuplicates(commands.map(c => c.category));
            embed.setDescription('For additional info on a command, use `?help <command>`');
            for (const category of categories) {
                const filteredCommands = commands.filter(c => c.category == category);
                embed.addFields([{
                    name: category || 'Misc',
                    value: filteredCommands.map(c => `\`${c.name}\``).join(' '),
                }]);
            }
        }

        message.channel.send(embed);
    }
}; 
```
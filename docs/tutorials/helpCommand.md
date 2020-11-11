## Making A Help Command
Now we have made all our handlers and our first **listener** and **command**
lets make some propper commands lets start with a help command.
First make a new file in your command folder for sake of conveniency lets call it help.js
In that file you will want to following code.
And make sure when you create your commands you give the `category` option to they get put into the help command correctly.
```JavaScript
const { Command } = require('discord.js-akago');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    
    constructor() {
        super('help', {
            description: 'Display a list of all commands I have.',
            category: 'Utilities',
            cooldown: 3,
        });
    }

    async execute(message, [commandName]) {
        const { commands, util } = this.client;
        const embed = new MessageEmbed().setColor('BLUE');
        const command = commands.get(commandName);

        if (command) {
            embed.setTitle(`\`${command.name} ${command.usage || ''}\``);
            embed.addField('❯ Description', command.description);
            if (command.aliases.length) {
                embed.addField('❯ Aliases', command.aliases.map(alias => `\`${alias}\``).join(' '));
            }
        }
        else {
            const categories = util.removeDuplicates(commands.map(c => c.category));
            embed.setDescription('For additional info on a command, use `?help <command>`');
            for (const category of categories) {
                embed.addField({
                    name: `❯ ${category || 'Misc'}`,
                    value: commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(' '),
                });
            }
        }

        message.channel.send(embed);
    }
}; 
```
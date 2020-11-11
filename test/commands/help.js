const { Command } = require('../../src/index.js');
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
                embed.addFields([{
                    name: `❯ ${category || 'Misc'}`,
                    value: commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(' '),
                }]);
            }
        }

        message.channel.send(embed);
    }
}; 
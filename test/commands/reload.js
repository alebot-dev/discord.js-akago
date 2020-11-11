const { Command } = require('../../src/index.js');

module.exports = class extends Command {

    constructor() {
        super('reload', {
            description: 'Reload all commands and listeners!',
            category: 'Owner',
            ownerOnly: true,
            cooldown: 5,
        });
    }

    async execute(message) {
        const reloaded = [];

        this.client.commands.forEach(command => {
            if (reloaded.includes(command.name)) return;
            this.client.CommandHandler.reloadCommand(command.name);
            reloaded.push(command.name);
        });
        this.client.events.forEach(listener => {
            if (reloaded.includes(listener.name)) return;
            this.client.ListenerHandler.reloadListener(listener.name);
            reloaded.push(listener.name);
        });

        message.channel.send('Reloaded all commands and listeners!');
    }
}; 
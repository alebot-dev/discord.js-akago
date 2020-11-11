const { Listener } = require('../../src/index.js');

module.exports = class extends Listener {
	constructor() {
		super('commandBlocked', {
            once: false,
            emitter: 'CommandHandler',
		});
	}
	
	async execute(message, command, reason) {
		const reasons = {
            'owner': `The **${command.name}** command can only be executed by the owner of this bot.`,
            'nsfw': `The **${command.name}** command can only be used in a nsfw channel.`,
        };

        message.channel.send(reasons[reason]);
	}
};
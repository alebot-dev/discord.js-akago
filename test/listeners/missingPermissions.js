const { Listener } = require('../../src/index.js');

module.exports = class extends Listener {
	constructor() {
		super('missingPermissions', {
            once: false,
            emitter: 'CommandHandler',
		});
	}
	
	async execute(message, command, type, missing) {
        const formattedPerms = missing.map(perm => `**${perm.replace(/_/g, ' ').toLowerCase()}**`).join(', ');
        message.channel.send(`${type === 'client' ? 'I am' : 'You are'} missing permissions ${formattedPerms} for the command ${command.name}`);
	}
};
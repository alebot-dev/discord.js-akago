const { Listener } = require('../../src/index.js');

module.exports = class extends Listener {
	constructor() {
		super('missingClientPermissions', {
            once: false,
            emitter: 'CommandHandler',
		});
	}
	
	async execute(message, missingPerms, command) {
        const formattedPerms = missingPerms.map(perm => `**${perm.replace(/_/g, ' ').toLowerCase()}**`).join(', ');
        message.channel.send(`I am missing permissions ${formattedPerms} for the command ${command.name}`);
	}
};
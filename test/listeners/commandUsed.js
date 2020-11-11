const { Listener } = require('../../src/index.js');

module.exports = class extends Listener {
	constructor() {
		super('commandUsed', {
            once: false,
            emitter: 'CommandHandler',
		});
	}
	
	async execute(message, command) {
        console.log(`${message.author.tag} used the command ${command.name}`);
	}
};
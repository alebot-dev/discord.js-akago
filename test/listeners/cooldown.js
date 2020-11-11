const { Listener } = require('../../src/index.js');

module.exports = class extends Listener {
	constructor() {
		super('cooldown', {
            once: false,
            emitter: 'CommandHandler',
		});
	}
	
	async execute(message, command, timeLeft) {
        const timeInSeconds = timeLeft / 1000;
		return message.channel.send(`Please wait ${timeInSeconds.toFixed(1)} more second(s) before reusing the **${command.name}** command.`);
	}
};
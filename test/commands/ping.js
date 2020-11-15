const { Command } = require('../../src/index.js');

module.exports = class extends Command {

    constructor() {
        super('ping', {
            description: 'Pong!',
            category: 'Util',
            cooldown: 5,
        });
    }

    async execute(message) {
        const msg = await message.channel.send('Pinging...');
        const messagePing = msg.createdTimestamp - message.createdTimestamp;
        msg.edit(`🏓 Pong! \`${messagePing}ms\` \nHeart beat: \`${this.client.ws.ping}ms\``);
    }
}; 
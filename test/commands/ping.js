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
        console.log(this.client.uptime);
    }
}; 
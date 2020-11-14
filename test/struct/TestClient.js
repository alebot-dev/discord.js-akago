const { AkagoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            token: require('../config.json').token,
        });

        this.CommandHandler = new CommandHandler(this, {
            commandDirectory: './test/commands',
            prefix: ['!', '?'],
            ignoreCooldowns: ['611466971371929602'],
            ignorePermissions: ['611466971371929602'],
        });

        this.ListenerHandler = new ListenerHandler(this, {
            listenerDirectory: './test/listeners',
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            inhibitorDirectory: './test/inhibitors',
        });

    }

    start() {
        this.build().then(() => console.log('Ready!'));
    }
};
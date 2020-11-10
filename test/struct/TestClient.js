const { AkagoClient, CommandHandler, ListenerHandler } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            prefix: ['!', '?'],
            token: require('../config.json').token,
        });

        new CommandHandler(this, {
            commandDirectory: './test/commands',
            prefix: ['!', '?'],
            ignoreCooldowns: ['611466971371929602'],
            ignorePermissions: ['611466971371929602'],
        });

        new ListenerHandler(this, {
            listenerDirectory: './test/listeners',
        });

    }

    start() {
        this.build().then(() => console.log('Ready!'));
    }
};
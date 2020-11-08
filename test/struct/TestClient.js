const { AkagoClient, CommandHandler, listenerHandler } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            prefix: ['!', '?'],
            token: require('../config.json').token,
            listenerDirectory: '/test/listeners',
            commandDirectory: '/test/commands',
        });

        new CommandHandler(this, {
            allowMentionPrefix: true,
            blockBots: true,
            blockClient: true,
            defaultCooldown: 3,
            ignoreCooldowns: ['611466971371929602'],
            ignorePermissions: ['611466971371929602'],
        });

        new listenerHandler(this);

    }

    start() {
        this.build();
    }
};
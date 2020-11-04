const { AkagoClient } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            prefix: '!',
            token: require('../config.json').token,
            listenerHandler: {
                listenerDirectory: '/listeners',
                handlerOptions: {
                    useAkagoMessageListener: true,
                },
            },
            commandHandler: {
                commandDirectory: '/commands',
                handlerOptions: {
                    blockBots: true,
                    blockClient: true,
                    defaultCooldown: 3,
                    ignoreCooldowns: ['611466971371929602'],
                    ignorePermissions: ['611466971371929602'],
                },
            },
        });
    }

    start() {
        this.login();
    }
};
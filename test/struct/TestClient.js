const { AkagoClient } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            prefix: '!',
            token: require('../config.json').token,
            listenerDirectory: '/listeners',
            commandHandler: {
                commandDirectory: '/commands',
                handlerOptions: {
                    useAkagoMessageListener: true,
                },
            },
        });
    }

    start() {
        this.login();
    }
};
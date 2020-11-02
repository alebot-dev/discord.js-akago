const { AkagoClient } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            prefix: '!',
            token: require('../config.json').token,
            listenerDirectory: './test/listeners',
        });
    }

    start() {
        this.login();
    }
};
const { AkagoClient } = require('../../src/index.js');

module.exports = class TestClient extends AkagoClient {
    constructor() {
        super({
            ownerID: ['611466971371929602'],
            token: require('../config.json').token,
        });

        this.on('ready', () => console.log('Yoo this is ready!'));
    }

    start() {
        this.login();
    }
};
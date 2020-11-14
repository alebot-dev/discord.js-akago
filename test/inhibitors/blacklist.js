const { Inhibitor } = require('../../src/index.js');

const blockedUsers = [
    '377907498264559621',
    '486209871419801610',
];

module.exports = class extends Inhibitor {
    constructor() {
        super('blacklist');
    }

    async execute(message) {
        if (blockedUsers.includes(message.author.id)) return true;
    }
};
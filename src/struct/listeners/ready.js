const { ListenerBase } = require('../../index.js');

module.exports = class extends ListenerBase {

    constructor(...args) {
        super(...args, {
            name: 'ready',
            once: true,
        });
    }

    async execute() {
        console.log('Yoo the bots ready!');
    }
}; 
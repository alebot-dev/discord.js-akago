const { ListenerBase } = require('../../src/index');

module.exports = class extends ListenerBase {

    constructor(...args) {
        super(...args, {
            name: 'ready',
            once: true,
        });
    }

    async execute() {
        console.log('Yoo this is ready!');
    }
};
const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

module.exports = (client) => {
    glob(`${path.dirname(require.main.filename)}${path.sep}listeners/**/*.js`).then(events => {
        for (const eventFile of events) {
            const { name } = path.parse(eventFile);
            const File = require(eventFile);
            const event = new File(client, name.toLowerCase());
            event.emitter[event.type](name, (...args) => event.execute(...args));
        }
    });
};
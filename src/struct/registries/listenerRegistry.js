const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

module.exports = (client) => {
    glob(`${path.dirname(require.main.filename)}${client.listenerDirectory}/**/*.js`).then(listeners => {
        for (const listenerFile of listeners) {
            const { name } = path.parse(listenerFile);
            const File = require(listenerFile);
            const listener = new File(client, name.toLowerCase());
            listener.emitter[listener.type](name, (...args) => listener.execute(...args));
        }
    });
};
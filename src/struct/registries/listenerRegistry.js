const ListenerBase = require('../base/listenerBase.js');
const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));
const appRoot = require('app-root-path');

module.exports = (client) => {
    if (!client.listenerDirectory || typeof client.listenerDirectory !== 'string') throw new Error('Akago: clientOptions listenerDirectory either is missing or is not a string.');
    glob(`${appRoot}${client.listenerDirectory}/**/*.js`).then(listeners => {
        for (const listenerFile of listeners) {
            const { name } = path.parse(listenerFile);
            const File = require(listenerFile);
            if (!client.util.isClass(File)) throw new TypeError(`Akago: Listener '${name}' doesn't export a class.`);
            const listener = new File(client, name.toLowerCase());
            if (!(listener instanceof ListenerBase)) throw new TypeError(`Akago: Listener '${name}' dosn't extend the listener base.`);
            listener.emitter[listener.type](name, (...args) => listener.execute(...args));
        }
    });
};
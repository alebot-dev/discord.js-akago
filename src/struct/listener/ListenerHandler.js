const ListenerBase = require('./Listener.js');
const { promisify } = require('util');
const path = require('path');
const glob = promisify(require('glob'));

class ListenerHandler {
    /**
     * Loads commands and handles messages.
     * @param {AkagoClient} client - The Akago Client.
     */
    constructor(client) {
        this.client = client;

        this.loadListeners();
    }

    loadListeners() {
        glob(`${process.cwd()}${this.client.listenerDirectory}/**/*.js`).then(listeners => {
            for (const listenerFile of listeners) {
                const { name } = path.parse(listenerFile);
                const File = require(listenerFile);
                if (!this.client.util.isClass(File)) throw new TypeError(`Akago: Listener '${name}' doesn't export a class.`);
                const listener = new File(this.client, name.toLowerCase());
                if (!(listener instanceof ListenerBase)) throw new TypeError(`Akago: Listener '${name}' dosn't extend the listener base.`);
                listener.emitter[listener.type]((listener.name || name), (...args) => listener.execute(...args));
            }
        });
    }

}

module.exports = ListenerHandler;
const ListenerBase = require('./Listener.js');
const path = require('path');
const glob = require('glob');

class ListenerHandler {
    /**
     * Loads commands and handles messages.
     * @param {AkagoClient} client - The Akago Client.
     */
    constructor(client) {
        this.client = client;

        /**
         * Directory to listeners.
         * @type {string}
         */
        this.listenerDirectory = path.resolve(this.client.listenerDirectory);

        const listenerPaths = glob.sync(`${this.listenerDirectory}**/*`);
        for (const listenerPath of listenerPaths) {
            this.loadListener(listenerPath);
        }
    }

    /**
     * Loads a Listener.
     * @param {string} filepath Path to file.
     */
    loadListener(filepath) {
         const { name } = path.parse(filepath);
        const File = require(filepath);
        if (!this.client.util.isClass(File)) throw new TypeError(`Akago: Listener '${name}' doesn't export a class.`);
        const listener = new File(this.client, name.toLowerCase());
        if (!(listener instanceof ListenerBase)) throw new TypeError(`Akago: Listener '${name}' dosn't extend the listener base.`);
        const emitter = (typeof listener.emitter === 'string' ? this.client[listener.emitter] : listener.emitter) || this.client;
        emitter[listener.type]((listener.name || name), (...args) => listener.execute(...args));
    }

}

module.exports = ListenerHandler;
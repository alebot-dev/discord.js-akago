/**
 * @typedef {Object} listenerHandlerOptions
 * @prop {string} listenerDirectory - File path to listener directory.
 */

const ListenerBase = require('./Listener.js');
const path = require('path');
const glob = require('glob');

class ListenerHandler {
    /**
     * Loads commands and handles messages.
     * @param {AkagoClient} client - The Akago Client.
     */
    constructor(client, {
        listenerDirectory,
    }) {
        this.client = client;
        if (!listenerDirectory || typeof listenerDirectory !== 'string') {
            throw new Error('Akago: listenerHandlerOptions listenerDirectory either is missing or is not a string.');
        }

        /**
         * Directory to listeners.
         * @type {string}
         */
        this.listenerDirectory = path.resolve(listenerDirectory);

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
        listener.client = this.client;
        listener.filepath = filepath;
        this.client.events.set(listener.name, listener);
        emitter[listener.type]((listener.name || name), (...args) => listener.execute(...args));
    }

    /**
     * Reloads a listener
     * @param {string} name - Name of the listener wanted to reload.
     */
    reloadListener(name) {
        const listener = this.client.events.get(name);
        if (!listener) throw new Error(`Akago: listenerHandler reloadListener ${name} isn't a event.`);
        delete require.cache[require.resolve(listener.filepath)];
        this.client.events.delete(listener.name);
        const emitter = (typeof listener.emitter === 'string' ? this.client[listener.emitter] : listener.emitter) || this.client;
        emitter.removeListener(listener.eventName, listener.execute);
        this.loadListener(listener.filepath);
    }

}

module.exports = ListenerHandler;
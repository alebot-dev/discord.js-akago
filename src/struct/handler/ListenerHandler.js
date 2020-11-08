const listenerRegistry = require('../registries/listenerRegistry.js');

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
        listenerRegistry(this.client);
    }

}

module.exports = ListenerHandler;
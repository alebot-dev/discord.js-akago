module.exports = class Listener {

    constructor(client, name, options = {}) {
        /**
         * Akago Framework Client
         * @type {Object}
         */
        this.client = client;
        /**
         * Name of the listener
         * @type {String}
         */
        this.name = name;
        /**
         * Type of the listener either on or once
         * @type {String}
         */
        this.type = options.once ? 'once' : 'on';
        /**
         * The listener emitter
         * @type {String}
         */
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
    }

}; 
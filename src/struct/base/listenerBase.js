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
        this.name = typeof options.name === 'string' ? options.name : name;
        /**
         * Type of the listener either on or once
         * @type {String}
         */
        this.type = typeof options.type === 'boolean' ? options.once ? 'once' : 'on' : 'on';
        /**
         * The listener emitter
         * @type {String}
         */
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
    }

}; 
/**
 * Options to use for command execution behavior.
 * @typedef {Object} ListenerOptions
 * @prop {string} [name=file name] The event name that will be emitted.
 * @prop {boolean} [once='on'] Whether the event will be on or once.
 * @prop {emitter} [emitter=client] The emitter of the event. 
 */
class Listener {
    /**
     * Creates a new listener.
     * @param {string} [name=File name] - Listener name if isn't provided in ListenerOptions.
     * @param {AkagoClient} [client] - The Akago Client.
     * @param {ListenerOptions} [options={}] - Options for the listener.
     */
    constructor(client, name, options = {}) {
        this.client = client;
        /**
         * The event name that will be emitted.
         * @type {string}
         */
        this.name = typeof options.name === 'string' ? options.name : name;
        /**
         * Whether the event will be on or once.
         * @type {boolean}
         */
        this.type = typeof options.type === 'boolean' ? options.once ? 'once' : 'on' : 'on';
        /**
         * The emitter of the event.
         * @type {emitter}
         */
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
    }

}

module.exports = Listener;
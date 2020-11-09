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
     * @param {string} name - Name of the listener.
     * @param {ListenerOptions} [options={}] - Options for the listener.
     */
    constructor(name, options = {}) {
        /**
         * The event name that will be emitted.
         * @type {string}
         */
        this.name = String(name);
        /**
         * Whether the event will be on or once.
         * @type {boolean}
         */
        this.type = options.once ? 'once' : 'on';
        /**
         * The emitter of the event.
         * @type {emitter}
         */
        this.emitter = options.emitter;
    }

}

module.exports = Listener;
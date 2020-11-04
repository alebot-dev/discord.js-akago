const path = require('path');

module.exports = (client, listenerFile) => {
    const { name } = path.parse(listenerFile);
    const File = require(listenerFile);
    const listener = new File(client, name.toLowerCase());
    listener.emitter[listener.type](name, (...args) => listener.execute(...args));
};
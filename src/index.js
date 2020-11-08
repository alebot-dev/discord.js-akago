module.exports = {
    // CORE
    AkagoClient: require('./struct/AkagoClient'),

    // BASE
    ListenerBase: require('./struct/base/listenerBase'),
    CommandBase: require('./struct/base/commandBase'),

    // HANDLERS
    CommandHandler: require('./struct/handler/commandHandler'),
    ListenerHandler: require('./struct/handler/ListenerHandler'),
}; 
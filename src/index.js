module.exports = {
    // CORE
    AkagoClient: require('./struct/AkagoClient'),

    // BASE
    ListenerBase: require('./struct/listener/Listener'),
    CommandBase: require('./struct/command/Command'),

    // HANDLERS
    CommandHandler: require('./struct/command/CommandHandler'),
    ListenerHandler: require('./struct/listener/ListenerHandler'),
}; 
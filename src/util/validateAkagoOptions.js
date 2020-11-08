module.exports = (options) => {
    if (typeof options !== 'object') throw new Error('Akago Client options should be a typeof Object');
    const isStr = (string) => typeof string === 'string';
    const isArr = (array) => Array.isArray(array);
    const isStrOrArr = (strOrArr) => isArr(strOrArr) || isStr(strOrArr);
    const isBoolean = (boolean) => typeof boolean === 'boolean';
    const clientErr = (option, type) => `Akago: ${option} option is either missing or not a ${type}.`;
    const cmdHandler = (option, type) => `Akago: commandHandlerOptions ${option} should be a ${type}.`;
    const lisHandler = (option, type) => `Akago: listenerHandlerOptions ${option} should be a ${type}`;
        
    // CLIENT OPTION CHECKS
    if (!options.token || !isStr(options.token)) throw new Error(clientErr('token', 'string'));
    if (!options.ownerID || !isArr(options.ownerID)) throw new Error(clientErr('ownerID', 'array/string'));
    if (!options.prefix || !isStrOrArr(options.prefix)) throw new Error(clientErr('prefix', 'array/string'));

    // COMMAND HANDLER CHECKS
    if (options.commandHandler) {
        if (typeof options.commandHandler !== 'object') throw new Error('Akago: commandHandler option must be an object.');
        const { commandDirectory, handlerOptions } = options.commandHandler; 
        if (!commandDirectory || !isStr(commandDirectory)) throw new Error('Akago: commandHandlerOptions commandDirectory is either missing or should be a string.');
        const { allowMentionPrefix, blockBots, useAkagoHelpCommand, defaultCooldown, miscCommandCategory, ignoreCooldowns, ignorePermissions } = handlerOptions || {};
        if (handlerOptions) {
            if (typeof handlerOptions !== 'object') throw new Error('Akago: commandHandlerOptions handlerOptions should be an object');
            if (allowMentionPrefix && !isBoolean(allowMentionPrefix)) throw new Error(cmdHandler('allowMentionPrefix', 'boolean'));
            if (blockBots && !isBoolean(blockBots)) throw new Error(cmdHandler('blockBots', 'boolean'));
            if (useAkagoHelpCommand && !isBoolean(useAkagoHelpCommand)) throw new Error(cmdHandler('useAkagoHelpCommand', 'boolean'));
            if (defaultCooldown && isNaN(defaultCooldown)) throw new Error(cmdHandler('defaultCooldown', 'number'));
            if (miscCommandCategory && !isStr(miscCommandCategory)) throw new Error(cmdHandler('miscCommandCategory', 'string'));
            if (ignoreCooldowns && !isStrOrArr(ignoreCooldowns)) throw new Error(cmdHandler('ignoreCooldowns', 'array'));
            if (ignorePermissions && !isStrOrArr(ignorePermissions)) throw new Error(cmdHandler('ignorePermissions', 'array'));
        }
    }

    // LISTENER HANDLER OPTIONS
    if (options.listenerHandler) {
        if (typeof options.listenerHandler !== 'object') throw new Error('Akago: listenerHandler must be an object.');
        const { listenerDirectory, handlerOptions } = options.listenerHandler; 
        if (!listenerDirectory || !isStr(listenerDirectory)) throw new Error('Akago: listenerHandlerOptions listenerDirectory is either missing or should be a string.');
        const { useAkagoMessageListener, akagoLogReady } = handlerOptions || {};
        if (handlerOptions) {
            if (useAkagoMessageListener && !isBoolean(useAkagoMessageListener)) throw new Error(lisHandler('useAkagoMessageListener', 'boolean'));
            if (akagoLogReady && !isBoolean(akagoLogReady)) throw new Error(lisHandler('akagoLogReady', 'akagoLogReady'));
        }
    } 
};
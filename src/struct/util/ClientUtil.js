module.exports = class Util {

    constructor(client) {
        this.client = client;
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    isClass(given) {
        return typeof given === 'function' &&
            typeof given.prototype === 'object' &&
            new String(given).substring(0, 5) === 'class';
    }

};
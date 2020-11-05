module.exports = class Util {

    constructor(client) {
        this.client = client;
    }

    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

};
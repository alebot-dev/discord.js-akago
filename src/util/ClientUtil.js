class ClientUtil {
    /**
     * Akago client utilities.
     * @param {AkagoClient} client - The Akago Client.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Removes any duplicate elements from an array. 
     * @param {Array}
     * @returns {Array}
     */
    removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    /**
     * Checks if a file exports a class.
     * @param {File}
     * @returns {boolean}
     */
    isClass(given) {
        return typeof given === 'function' &&
            typeof given.prototype === 'object' &&
            new String(given).substring(0, 5) === 'class';
    }

    /**
     * Capitalizes the first character of a string.
     * @param {string} 
     * @returns {string}
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}

module.exports = ClientUtil;
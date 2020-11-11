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
     * @param {Array} - Array to remove duplicate elements from.
     * @returns {Array}
     */
    removeDuplicates(array) {
        return [...new Set(array)];
    }

    /**
     * Checks if a function exports a class.
     * @param {Function} - Function to check if it exports a class.
     * @returns {boolean}
     */
    isClass(given) {
        return typeof given === 'function' &&
            typeof given.prototype === 'object' &&
            new String(given).substring(0, 5) === 'class';
    }

    /**
     * Capitalizes the first character of a string.
     * @param {string} - String to be capitalized
     * @returns {string}
     */
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

module.exports = ClientUtil;
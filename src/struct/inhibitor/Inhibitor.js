class Inhibitor {
    constructor(name, opts = {}) {
        this.name = typeof name === 'string' ? name : '';

        if (opts && typeof opts === 'object') this.opts = opts;
    }
}

module.exports = Inhibitor;
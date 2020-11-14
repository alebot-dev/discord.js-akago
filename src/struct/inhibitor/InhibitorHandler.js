const path = require('path');
const InhibitorBase = require('./Inhibitor.js');
const rread = require('readdir-recursive');

class InhibitorHandler {
    constructor(client, {
        inhibitorDirectory,
    }) {
        this.client = client;

        this.inhibitorDirectory = path.resolve(inhibitorDirectory);

        const inhibitorsPaths = rread.fileSync(this.inhibitorDirectory);
        for (const inhibitorsPath of inhibitorsPaths) {
            this.loadInhibitor(inhibitorsPath);
        }
    }

    loadInhibitor(filepath) {
        const inhibitor = require(filepath);
        if (!(inhibitor instanceof InhibitorBase)) return;
        if (this.inhibitors.has(inhibitor.id)) throw new Error(`Inhibitor ${inhibitor.id} already loaded.`);
        inhibitor.filepath = filepath;
        inhibitor.client = this.client;
        this.client.inhibitors.set(inhibitor.name, inhibitor);
    }
}

module.exports = InhibitorHandler;
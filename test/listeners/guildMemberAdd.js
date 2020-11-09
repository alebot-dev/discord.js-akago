const { ListenerBase } = require('../../src/index.js');

module.exports = class extends ListenerBase {
	constructor() {
		super('guildMemberAdd', {
			once: false,
		});
	}
	
	async execute(member) {
		console.log(`${member.user.tag} has joined the server!`);
	}
};
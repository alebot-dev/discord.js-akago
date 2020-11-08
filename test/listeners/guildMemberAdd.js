const { ListenerBase } = require('../../src/index.js');

module.exports = class extends ListenerBase {
	constructor(...args) {
		super(...args, {
			name: 'guildMemberAdd', 
			once: false,
		});
	}
	
	async execute(member) {
		console.log(`${member.user.tag} has joined the server!`);
	}
};
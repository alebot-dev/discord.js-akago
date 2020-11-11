### Listeners
Setting up a listener *(AKA: Events)* is just as easy as making a command! Here is a simple `guildMemberAdd` event which will `console.log()` when a member joins a guild. This file should be placed in `src/listeners` and called `guildMemberAdd.js` for sake of conveniency.
```JavaScript
const { Listener } = require('discord.js-akago');

module.exports = class extends Listener  {
	constructor() {
		super('guildMemberAdd', {
			once: false,
		});
	}

	async execute(member) {
		console.log(`${member.user.tag} has joined the server!`);
	}
};
```
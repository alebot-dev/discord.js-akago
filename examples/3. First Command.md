### Commands
Now the **Akago Framework** and **handlers** are set up is done. Let's make your first command.
This is a simple ping command, this file would be placed in your `src/commands` folder.
```JavaScript
const { Command } = require('discord.js-akago');

module.exports = class extends Command {
	constructor() {
		super('ping', {
			description: 'Pong!',
			category: 'Utilites',
			aliases: ['p'],
			cooldown: 5,
		});
	}

	async execute(message) {
		return message.channel.send('Pong!');
	}
};
```
And its as simple as that!
When the command `!ping` or the aliases `!p` is used the bot will respond with `Pong!`.

**Note:** If you want to get access to the `client` you will use `this.client`

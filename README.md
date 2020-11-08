
<div align="center">
  <br />
  <p>
    <a href="https://discord.js.org"><img src="https://i.imgur.com/tt64LX5.png" width="546" alt="discord.js-akago" /></a>
  </p>
  <p>
    <a href="https://discord.gg/bRCvFy9"><img src="https://img.shields.io/discord/717861844127055873?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/discord.js-akago"><img src="https://img.shields.io/npm/v/discord.js-akago.svg" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord.js-akago"><img src="https://img.shields.io/npm/dt/discord.js-akago.svg" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/discordjs/discord.js-akago"><img src="https://img.shields.io/david/iColtz/discord.js-akago" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/discord.js-akago/"><img src="https://nodei.co/npm/discord.js-akago.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

## About

discord.js-akago is a flexible, easy to use framework for discord.js that allows you to make command handlers, event handlers completely customizable with many features such as: cooldowns, aliases and much much more!

## Example usage
### Directory
```FILETREE
yourProject 
| index.js 
|----src 
   |----commands 	
	   |----ping.js
   |----listeners
	   |----guildMemberAdd.js
```

```js
// Code for: index.js
const Akago = require('discord.js-akago');

const client = new Akago.AkagoClient({
	// Akago Client Options
	ownerID: ['611466971371929602'],
	prefix: '?',
	token: 'discord bot token',
	listenerDirectory: '/src/listeners',
	commandDirectory: '/src/commands',
}, {
	// Discord.js Client Options
	disableMentions: 'everyone',
});

new Akago.CommandHandler(client);
new Akago.listenerHandler(client);
```
```js
// Code for: src/ping.js
const { CommandBase } = require('discord.js-akago');

module.exports = class extends CommandBase {
	constructor(...args) {
		super(...args, {
			name: 'ping',
			description: 'Pong!',
			aliases: ['p'],
			cooldown: 5,
		});
	}

	async execute(message) {
		return message.channel.send('Pong!');
	}
};
```
```js
// Code for: src/guildMemberAdd.js
const { ListenerBase } = require('discord.js-akago');

module.exports = class extends ListenerBase  {
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
```

## Links
- [Discord.js Discord server](https://discord.gg/2jkBmzy)
- [GitHub](https://github.com/discord-js-akago/discord.js-akago)
- [NPM](https://www.npmjs.com/package/discord.js-akago)


## Help

If you don't understand something in the documentation, you are experiencing problems, don't hesitate to join our [Discord Server](https://discord.gg/2jkBmzy) to seek for some help.
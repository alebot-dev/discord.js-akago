<div align="center">
  <br />
  <p>
    <img src="https://i.imgur.com/tt64LX5.png" width="546" alt="discord.js-akago" />
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/discord.js-akago"><img src="https://img.shields.io/npm/v/discord.js-akago.svg" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord.js-akago"><img src="https://img.shields.io/npm/dt/discord.js-akago.svg" alt="NPM downloads" /></a>
	<a href="https://github.com/iColtz/discord.js-akago/issues"><img src="https://img.shields.io/github/issues/iColtz/discord.js-akago" alt="NPM issues">
	<a href="https://discord.gg/2jkBmzy"><img src="https://img.shields.io/discord/717861844127055873?color=7289da&logo=discord&logoColor=white" alt="Discord">
	<a href="https://github.com/iColtz/discord.js-akago"><img src="https://img.shields.io/github/repo-size/iColtz/discord.js-akago" alt="Repo size">
	<a href="https://github.com/iColtz/discord.js-akago"><img src="https://img.shields.io/github/commit-activity/y/iColtz/discord.js-akago" alt="Commits per year">
	<a href="https://github.com/iColtz/discord.js-akago/blob/main/package.json#L33"><img src="https://img.shields.io/david/dev/iColtz/discord.js-akago" alt="Dependencies">
  </p>
  <p>
    <a href="https://nodei.co/npm/discord.js-akago/"><img src="https://nodei.co/npm/discord.js-akago.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

## About
A customizable bot framework for Discord.js v12.
Everything is easy to use, setup and very flexible.
## Setting Up The Client
Setting up the Akago Client, this will need to be in your main file according to your `package.json`
```js
// Refer to the 'More Detail!' category for more information on the Akago's options.
const { AkagoClient } = require('discord.js-akago');

const client = new AkagoClient({
	ownerID: ['611466971371929602'],
	prefix: '?',
	token: 'discord bot token',
	commandHandler: {
		commandDirectory: '/src/commands',
		handlerOptions: {
			allowMentionPrefix: true,
			blockBots: true,
			blockClient: true,
			useAkagoHelpCommand: true,
			defaultCooldown:  3,
			miscCommandCategory: 'Miscellaneous',
			ignoreCooldowns: ['611466971371929602'],
			ignorePermissions: ['611466971371929602'],
		},
	},
	listenerHandler: {
		listenerDirectory: 'src/listeners',
		handlerOptions: {
			useAkagoMessageListener:  true,
			akagoLogReady:  true,
		},
	},
});

client.start();
```
## Creating Your First Command
Creating your first command, you will want to go to your command folder, the same directory as your `commandDirectory` option provided in the Akago Client.
```js
const { CommandBase } = require('discord.js-akago');

module.exports = class extends CommandBase {
	constructor(...args) {
		super(...args, {
			name: 'kick',
			description: 'Kicks a member from the server!', // Optional (Will show on help embed)
			category: 'Moderation', // Optional (Will show on help embed)
			aliases: ['remove'],
			usage: '<member> [...reason]', // Optional (Will show on help embed)
			examples: ['kick @Coltz doing something bad!'],
			cooldown: 10,
			ownerOnly: false, // Default: false
			guildOnly: true, // Default: true
			nsfw: false, // Default: false
			memberPermissions: ['KICK_MEMBERS'],
			clientPermissions: ['KICK_MEMBERS'],
		}):
	}
	
	async  execute(message)  {
		return message.channel.send('Pong!');
	}
};
```

## Creating Your First Listener
Although Akago has a default message and ready event you can use, you might also want to add some of your own events.
```js
const { ListenerBase } = require('discord.js-akago');

module.exports = class extends ListenerBase {
	constructor(...args) {
		super(...args, {
			name: 'guildMemberAdd', // Event name
			once: false, // Default: false
		}):
	}
	
	async  execute(member)  {
		console.log(`${member.user.tag} has joined the server!`);
	}
};
```
## More Detail!
Although we covered some of the features Akago has, there is still much more to explain.

- Client Options
	- OwnerID
		- A collection of user's of the owners of the client.
		- Type: String|Array
	- Token
		- Your discord bot token.
		- Type: String
	- Prefix
		- Collection of prefix's for your client. Either a string or an array.
		- Type: String
		- Default: !
	- listenerHandler
		- Type: Object
			- useAkagoMessageListener
				- Whether or not to use Akago's default message listener
				- Type: Boolean
				- Default: true
			- akagoLogReady
				- Wheather of not Akago will console log ready when bot starts
				- Type: Boolean
				- Default: true
	- commandHandler
		- Type: Object
			- allowMentionPrefix
				- Whether or not mentioning the client will be a valid prefix
				- Type: Boolean
				- Default: true
			- blockBots
				- Whether or not Akagos message listener will block bots messages
				- Type: Boolean
				- Default: true
			- blockClient
				- Whether or not Akagos message listener will block the clients messages
				- Type: Boolean
				- Default: true
			- defaultCooldown
				- The default cooldown of commands that don't have a cooldown, set to 0 for no default cooldown
				- Type: Number
				- Default: 3
			- useAkagoHelpCommand
				- Whether or not to use Akago's default help command, must use Akagos default message listener for this to work
				- Type: Boolean
				- Default: true
			- miscCommandCategory
				- Name of the category for commands that don't have their own category
				- Type: String
				- Default: Misc
			- ignorePermissions
				- Collection of users ID's that will bypass permission checks
				- Type: Array
			- ignoreCooldowns
				- Collection of users ID's that will bypass cooldowns
				- Type: Array
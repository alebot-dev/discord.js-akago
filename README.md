<div align="center">
  <br />
  <p>
    <img src="https://i.imgur.com/tt64LX5.png" width="546" alt="discord.js-akago" />
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/discord.js-akago"><img src="https://img.shields.io/npm/v/discord.js-akago.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discord.js-akago"><img src="https://img.shields.io/npm/dt/discord.js-akago.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/discordjs/discord.js-akago"><img src="https://img.shields.io/david/discordjs/discord.js-akago.svg?maxAge=3600" alt="Dependencies" /></a>
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
const { AkagoClient } = require('discord.js-akago');

const client = new AkagoClient({
	ownerID: ['611466971371929602'],
	prefix: '?',
	token: 'discord bot token',
	commandHandler: {
		commandDirectory: '/src/commands',
		handlerOptions: {
			defaultCooldown:  3,
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
	constructor(...args, {
		super(...args, {
			name: 'ping',
			description: 'Pong!',
			category: 'Util',
			aliases: ['p'],
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
	constructor(...args, {
		super(...args, {
			name: 'guildMemberAdd',
			once: false,
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
	- listenerHandler
		- Type: Object
			- useAkagoMessageListener
				- Whether or not to use Akago's default message listener
				- Type: Boolean
			- akagoLogReady
				- Wheather of not Akago will console log ready when bot starts
				- Type: Boolean
	- commandHandler
		- Type: Object
			- allowMentionPrefix
				- Whether or not mentioning the client will be a valid prefix
				- Type: Boolean
			- blockBots
				- Whether or not Akagos message listener will block bots messages
				- Type: Boolean
			- blockClient
				- Whether or not Akagos message listener will block the clients messages
				- Type: Boolean
			- defaultCooldown
				- The default cooldown of commands that don't have a cooldown, set to 0 for no default cooldown
				- Type: Number
			- useAkagoHelpCommand
				- Whether or not to use Akago's default help command, must use Akagos default message listener for this to work
				- Type: Boolean
			- miscCommandCategory
				- Name of the category for commands that don't have their own category
				- Type: String
			- ignorePermissions
				- Collection of users ID's that will bypass permission checks
				- Type: Array
			- ignoreCooldowns
				- Collection of users ID's that will bypass cooldowns
				- Type: Array
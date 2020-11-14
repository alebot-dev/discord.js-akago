## First Listener
### Listener Handler
For making a listener handler we will need to import and instantiate the `ListenerHandler` similar to how we did the `CommandHandler`
```js
const { AkagoClient, CommandHandler, ListenerHandler } = require('discord.js-akago');

class myClient extends AkagoClient {
	constructor() {
		super({
			ownerID: ['Your user ID'],
			token: 'Your discord bot token',
		}, {
			disableMentions:  'everyone',
		});
		this.commandHandler = new CommandHandler(this, {
			commandDirectory: './commands',
			prefix: '!', // or ['?', '!']
		});
		this.listenerHandler = new ListenerHandler(this, {
			// Options for the listener handler.
		});
	};
	start()  {
		this.build();
	}
}

const client = new myClient();
client.start();
```
#### Listener Handler Options
The `listenerDirectory` option tells the handler what folder all your listener are located.
```js
this.listenerHandler = new ListenerHandler(this, {
	listenerDirectory: './listeners',
});
```
You can view all of the `listenerHandlerOptions` [here](https://discord-akago.github.io/global.html#listenerHandlerOptions).
### Ready event
Time to make your first listener!
In the listener handler options you specified a directory to a listener folder go to that directory and make a new file, lets call it `ready.js`.
First of all we want to import the `Listener` class.
```js
const { Listener } = require('discord.js-akago');
```
Now here is a basic ready listener:
```js
const { Listener } = require('discord.js-akago');

module.exports = class ReadyListener extends Listener {
	constructor() {		
		super('ready', {
			once: true,
		});
	};
	
	execute() {
		console.log('Im ready!');
	}
};
```
The first parameter of the `super` is the unique listener name.
The second parameter are the options of the command such as: `emitter`, `once` ect.
You can view a full list of all command options [here](https://discord-akago.github.io/global.html#ListenerOptions).
The third optional parameter are custom opts of the listener, this is not needed.
The execute method if the function ran when the listener is emitted.

If everything was done correctly your ready listener should now work!
### Akago Command Handler Listeners
Akago has events that are emitted through out various stages of the command handling. Such as there is an event when a member dosn't have permissions to do a command or they are on cooldown ect.
We can use these events to send messages when they are missing something to execute the command.
#### Cooldown Event
The `cooldown` event is emitted when a member tries to execute a command but they are on cooldown.
We can use this to send a message telling them that they are on a cooldown.
Lets go to our listener directory and make a new file, lets call it `cooldown.js`
```js
const { Listener } = require('discord.js-akago');

module.exports = class CooldownListener extends Listener {
	constructor() {		
		super('cooldown', {
			emitter: 'commandHandler',
			once: false,
		});
	};
	
	execute(message, command, timeLeft) {
		const remaining = (timeLeft / 1000).toFixed(1);
		const { name } = command;
		message.channel.send(`Wait ${remaining} more second(s) before reusing the ${name} command.`);
	}
};
```
##### Cooldown Parameters
First parameter is the discord `message` that was sent.
Second parameter is the `command` that was used.
Third parameter is the time remaining on the member's cooldown in milliseconds.
### Command Blocked Listener
The `commandBlocked` event is emitted when a command can't be executed for either: the command is `guildOnly` but it was send in DM's, the command is a `ownerOnly` but the user who executed the command is not an owner or the command is a `nsfw` but the command was not used in a NSFW channel.
Lets go to our listener directory and create a new file called `commandBlocked.js`.
```js
const { Listener } = require('discord.js-akago');

module.exports = class CommandBlockedListener extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			once: false,
		});
	}

	execute(message, command, reason) {
		const { name } = command;
		const reasons = {
			'owner': `The ${name} command can only be used by the owner of the bot.`,
			'nsfw': `The ${name} command can only be used in a nsfw channel.`,
			'dm': `The ${name} command can only be used in guilds.`,
		};
			
		message.channel.send(reasons[reason]);
	}
};
```
First parameter is the discord `message` that was sent.
The second parameter is the `command` that was used.
Third parameter is the reason the command was blocked either `owner`, `dm` or `nsfw`.
### Missing Permissions Listener
The `missingPermissions` event will emit when a command is used but either the client or member is missing permissions to run the command.
Lets go to our listener directory and create a new file lets call it `missingPermissions.js`.
```js
const { Listener } =  require('discord.js-akago');

module.exports = class MissingPermissionsListener extends Listener {
	constructor() {
		super('missingPermissions', {
			emitter: 'commandHandler',
			once: false,
		});
	}

	execute(message, command, type, missing) {
		const perms = missing.map(p  =>  p.replace(/_/g,  ' ').toLowerCase()).join(', ');
		const user = type  ===  'client'  ?  'I am'  :  'You are';
		const { name } = command;
		return message.channel.send(`${user} missing permissions ${perms} for the command ${name}`);
	}
};
```
First parameter is a discord `message` that was sent.
The second parameter is the `command` that was used.
The third parameter is whos missing the permissions either `client` or `member`.
The fourth parameter is a filtered array of the permission that is missing that is needed for the command.
## First Inhibitors
### What Is A Inhibitor
An inhibitor is function executed before a command is executed. 
If the execute function returns `true` the command won't be executed. If returned `false` it will execute.
This is useful for making custom features for your commands such as easily blacklisting member's from using commands.
### Inhibitors Handler
For making a inhibitor handler we will need to import and instantiate the `InhibitorHandler` similar to how we did the `CommandHandler` and the `ListenerHandler`
```js
const { AkagoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord.js-akago');

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
			listenerDirectory: './listeners',
		});
		this.inhibitorHandler = new InhibitorHandler(this, {
			// Options for the inhibitor handler.
		});
	};
	start()  {
		this.build();
	}
}

const client = new myClient();
client.start();
```
#### Inhibitor Handler Options
The `inhibitorHandler` option tells the handler what folder all your inhibitors are located.
```js
this.inhibitorHandler = new InhibitorHandler (this, {
	inhibitorHandler : './inhibitors',
});
```
You can view all of the `inhibitorHandlerOptions` [here](https://discord-akago.github.io/global.html#inhibitorHandlerOptions).
### Blacklisting Members
Go to your inhibitors folder and create a new file called `blacklist.js`
```js
const { Inhibitor } = require('discord.js-akago');

module.exports = class BlackListInhibitor extends Inhibitor {
	constructor() {
			super('blacklist');
	}
	
	execute(message) {
		const blacklists = ['611466971371929602']; 
		return blacklists.includes(message.author.id);
	}
};
```
The first parameter is the discord `message` that was sent.
The second parameter is the `command` that was used.
## First Command
### Command Handler
For making a command handler we will need to import and instantiate the `CommandHandler`
```js
const { AkagoClient, CommandHandler } = require('discord.js-akago');

class myClient extends AkagoClient {
	constructor() {
		super({
			ownerID: ['Your user ID'],
			token: 'Your discord bot token',
		}, {
			disableMentions:  'everyone',
		});
		this.commandHandler = new CommandHandler(this, {
			// Options for the command handler.
		});
	}
	start()  {
		this.build();
	}
}

const client = new myClient();
client.start();
```
#### Command Handler Options
The `commandDirectory` option tells the handler what folder all your commands are located.
The `prefix` option is the prefix(es) you want to use, you can have multiple by using an array.
```js
this.commandHandler = new CommandHandler(this, {
	commandDirectory: './commands',
	prefix: '!', // or ['?', '!']
});
```
You can view all of the `commandHandlerOptions` [here](https://discord-akago.github.io/#/docs/main/main/typedef/commandHandlerOptions).
### Ping Command
Time to make your first command!
In the command handler options we specified a `commandDirectory` go to that folder directory and create a new file called `ping.js`. 
First of all we want to import the `Command` class.
```js
const { Command } = require('discord.js-akago');
```
Now here is a basic ping command:
```js
const { Command } = require('discord.js-akago');

module.exports = class PingCommand extends Command {
	constructor() {		
		super('ping', {
			description: 'Pong!',
			aliases: ['p'],
			category: 'Utilities',
		});
	}
	
	execute(message) {
		return message.reply('Pong!');
	}
};
```
The first parameter of the `super` is the unique command name.
The second parameter are the options of the command such as: `aliases`, `cooldown`, `ownerOnly` ect.
You can view a full list of all command options [here](https://discord-akago.github.io/#/docs/main/main/typedef/CommandOptions).
The third optional parameter are custom opts of the command, this is not needed.
The execute method if the function ran when the command is used.

If everything was done correctly you ping command should now work!

### Reference
You can compare your code to the guides code here [here](https://github.com/discord-akago/guide/tree/main/Code%20Samples/CommandHandling).
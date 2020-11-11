### Handlers
Since this is most likely your first time using `discord.js-akago` we have made it very easy for you to set up a **command** and **event** handlers. First off lets go to your main file. And it should look something like this right?
```JavaScript
const Akago = require('discord.js-akago');

const client = new Akago.AkagoClient({
	// Akago Client Options
	ownerID: ['611466971371929602'],
	prefix: '?',
	token: 'discord bot token',
}, {
	// Discord.js Client Options
	disableMentions: 'everyone',
});

client.build().then(console.log('Ready!'));
```

Now lets add an event and command handler onto that!
Easy right?
```JavaScript
const Akago = require('discord.js-akago');

const client = new Akago.AkagoClient({
	// Akago Client Options
	ownerID: ['611466971371929602'],
	prefix: '?',
	token: 'discord bot token',
}, {
	// Discord.js Client Options
	disableMentions: 'everyone',
});

client.commandHandler = new Akago.CommandHandler(client);
client.listenerHandler = new Akago.ListenerHandler(client);

client.build().then(console.log('Ready!'));
```
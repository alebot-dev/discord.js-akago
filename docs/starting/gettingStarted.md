## Getting started.
### Installation
Before anything else you will need to install the **discord.js-akago** and **discord.js** packages.
`npm install discord.js-akago`
`npm install discord.js`
Then you want to create a new file in your main directory lets call it `bot.js`
So right now your project directory should look something like this:
```
myProject
|___ node_modules
	 index.js
```
### Main File
Inside your `index.js`, require `discord.js-akago` and extend the `AkagoClient` class.
```js
const { AkagoClient } = require('discord.js-akago');

class myClient extends AkagoClient {
		constructor() {
		super({
			// Akago Options
			ownerID: 'Your user ID',
		    token: 'Your discord bot token',
		}, {
			// Discord.js Client Options
		});
	};
	start() {
		this.build();
	}
}

const client = new myClient();
client.start();
```
Lets say we want to add some [Discord.js Client Options](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions) to our Akago Client. Lets add the `disableMentions` option to our client.
```js
const { AkagoClient } = require('discord.js-akago');

class myClient extends AkagoClient {
		constructor() {
		super({
			ownerID: ['Your user ID'],
		    token: 'Your discord bot token',
		}, {
			disableMentions: 'everyone',
		});
	};
	start() {
		this.build().then(() => console.log('The bot is ready!'));
	}
}

const client = new myClient();
client.start();
```
Your bot will now login and your ready to move onto making handlers!
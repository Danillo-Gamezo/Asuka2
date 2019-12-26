//Adding token from env variables
require('dotenv').config()

// require the discord.js and fs modules
const Discord = require('discord.js');
const fs = require('fs');

// create a new Discord client
const client = new Discord.Client();
const prefix = ".asuka ";

//Setting lists of commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Importing the commands from the folder
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log("Ready");
});

client.on('message', message => {
    // Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `.asuka`
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();
	const mentionned_user = getUserFromMention(args[0]);

	switch(command) {
		case 'baka':
			client.commands.get('baka').execute(message, args, mentionned_user);
		break;
		// Just add any case commands if you want to..
		default:
			message.channel.send("It's not a command. What are you, stupid ?!")
		break;
	 }
});

// login to Discord with your app's token
client.login(process.env.bot_token);

//Functions
function getUserFromMention(mention) {
	if (!mention) return;
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}
		return client.users.get(mention);
	}
}
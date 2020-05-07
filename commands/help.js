const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Give commands list',
	execute(message, args, mentionned_user) {
		const helpEmbed = new Discord.MessageEmbed().setTitle("Commands list").setColor("#ff0000")
		// for (command in fs.readdirSync('./').filter(file => file.endsWith('.js')) ) {
		// 	Embed.addFields({ name: "test", value: 'Some value here' })
		// }
		message.channel.send(helpEmbed);
	}
};
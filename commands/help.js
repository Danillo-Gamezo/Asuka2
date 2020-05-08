const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Give commands list',
	execute(message, args, mentioned_user, commands) {
		embed = new Discord.MessageEmbed()
				.setTitle("Commands list")
				.setColor('#ff0000')
		for (const command of commands) {
			embed.addFields({name: command[1].name, value: command[1].description});
		}
		message.channel.send(embed);
	}
};
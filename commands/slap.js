require('dotenv').config()
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'slap',
	description: 'Reply with a slap',
	execute(message, args, mentionned_user) {
		if((mentionned_user) && (mentionned_user.id!==process.env.id) && (mentionned_user!=message.author)) {
			fs.readdir('./images/Slap', (err, files) => {
				const list_img = []
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.floor(Math.random() * (list_img.length))];
				const Embed = new Discord.RichEmbed()
					.setColor('#ff0000')
					.attachFiles(['./images/Slap/'+img])
					.setImage('attachment://'+img)
				message.channel.send(Embed);
			});
		}
		else if ((message.mentions.users.first()) && (message.mentions.users.first().id==process.env.id)) {
			message.channel.send('How dare you slapping me ?!');
		}
		else if (mentionned_user==message.author) {
			message.channel.send('...... are you masochist ?');
		}
		else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

const Discord = require('discord.js');
const Sequelize = require('sequelize');
const fs = require('fs');

module.exports = {
	name: 'hug',
	description: 'Reply with a hug image',
	execute(message, args, mentionned_user) {

		if(mentionned_user==message.author) {
			const Embed = new Discord.RichEmbed()
				.setColor('#ff0000')
				.attachFiles(['./images/Pathetic.jpeg'])
				.setImage('attachment://Pathetic.jpeg')
			message.channel.send(Embed);
		} else if((message.mentions.users.first()) && (message.mentions.users.first().id=="605108406398746674")) {
			message.channel.send("Gross...");
		} else {
			fs.readdir('./images/Hug', (err, files) => {
				const list_img = []
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.floor(Math.random() * (list_img.length))];
				const Embed = new Discord.RichEmbed()
					.setColor('#ff0000')
					.setDescription(mentionned_user+" It's not like I love you or anything... ")
					.attachFiles(['./images/Hug/'+img])
					.setImage('attachment://'+img)
				message.channel.send(Embed);
			});
		}
	},
};

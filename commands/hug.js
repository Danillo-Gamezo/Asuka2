require('dotenv').config()
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const fs = require('fs');

module.exports = {
	name: 'hug',
	description: 'Reply with a hug image. You need to tag someone to use it.',
	execute(message, args, mentionned_user) {
		if((mentionned_user) && (mentionned_user.id!==process.env.id) && (mentionned_user!=message.author)) {
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
		} else if(mentionned_user==message.author) {
			const Embed = new Discord.RichEmbed()
				.setColor('#ff0000')
				.attachFiles(['./images/Pathetic.jpeg'])
				.setImage('attachment://Pathetic.jpeg')
			message.channel.send(Embed);
		} else if((message.mentions.users.first()) && (message.mentions.users.first().id==process.env.id)) {
			message.channel.send("Gross...");
		} else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

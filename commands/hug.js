require('dotenv').config();
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const fs = require('fs');

module.exports = {
	name: 'hug',
	description: 'Reply with a hug image. You need to tag someone to use it.',
	execute(message, args, mentioned_user) {
		if((mentioned_user) && (mentioned_user.id!==process.env.id) && (mentioned_user!=message.author)) {
			fs.readdir('./images/Hug', (err, files) => {
				const list_img = []
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.floor(Math.random() * (list_img.length))];
				const Embed = new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(`<@${mentioned_user.id}>, it's not like I love you or anything...`)
					.attachFiles(['./images/Hug/'+img])
					.setImage('attachment://'+img);
				message.channel.send(Embed);
			});
		} else if(mentioned_user==message.author) {
			const Embed = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.attachFiles(['./images/Pathetic.jpeg'])
				.setImage('attachment://Pathetic.jpeg');
			message.channel.send(Embed);
		} else if(mentioned_user && (mentioned_user.id==process.env.id)) {
			message.channel.send("Gross...");
		} else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

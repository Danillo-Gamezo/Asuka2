require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'slap',
	description: 'Reply with a slap. You need to tag someone to use it.',
	execute(message, args, mentioned_user) {
		if((mentioned_user) && (mentioned_user.id!==process.env.id) && (mentioned_user!=message.author)) {
			fs.readdir('./images/Slap', (err, files) => {
				const list_img = [];
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.floor(Math.random() * (list_img.length))];
				const Embed = new Discord.MessageEmbed()
					.setDescription(`<@${mentioned_user.id}> ! BAKAAAAAAAAAAA !`)
					.setColor('#ff0000')
					.attachFiles(['./images/Slap/'+img])
					.setImage('attachment://'+img);
				message.channel.send(Embed);
			});
		}
		else if (mentioned_user && (mentioned_user.id==process.env.id)) {
			message.channel.send('How dare you slapping me ?!');
		}
		else if (mentioned_user==message.author) {
			message.channel.send('...... are you masochist ?');
		}
		else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'kiss',
	description: 'Reply with a kiss gif. You need to tag someone to use it.',
	execute(message, args, mentioned_user) {
		if((mentioned_user) && (mentioned_user.id!==process.env.id) && (mentioned_user!=message.author)) {
			fs.readdir('./images/Kiss', (err, files) => {
				const list_img = []
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.floor(Math.random() * (list_img.length))];
				const Embed = new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(`Don't think I love you, I just have been asked to do it <@${mentioned_user.id}> !`)
					.attachFiles(['./images/Kiss/'+img])
					.setImage('attachment://'+img);
				message.channel.send(Embed);
			});
		}
		else if (mentioned_user && (mentioned_user.id==process.env.id)) {
			message.channel.send('What are you trying to do, baka ?!');
		}
		else if (mentioned_user==message.author) {
			const Embed = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.attachFiles(['./images/Pathetic.jpeg'])
				.setImage('attachment://Pathetic.jpeg');
			message.channel.send(Embed);
		}
		else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

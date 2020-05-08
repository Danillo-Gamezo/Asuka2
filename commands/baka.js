require('dotenv').config()
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'baka',
	description: 'Reply with Anta Baka. You need to tag someone to use it.',
	execute(message, args, mentioned_user) {
		if((mentioned_user) && (mentioned_user.id!==process.env.id) && (mentioned_user!=message.author)) {
			fs.readdir('./images/Baka', (err, files) => {
				const list_img = []
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.floor(Math.random() * (list_img.length))];
				const Embed = new Discord.MessageEmbed()
					.setColor('#ff0000')
					.setDescription(`Baka-<@${mentioned_user.id}> !`)
					.attachFiles(['./images/Baka/'+img])
					.setImage('attachment://'+img)
				message.channel.send(Embed);
			});
		}
		else if (mentioned_user && (mentioned_user.id==process.env.id)) {
			message.channel.send('What are you trying to say, baka ?!');
		}
		else if (mentioned_user==message.author) {
			message.channel.send('Are you... stupid ?!');		
		}
		else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

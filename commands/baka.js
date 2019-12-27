const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'baka',
	description: 'Reply with Anta Baka',
	execute(message, args, mentionned_user) {
		if(mentionned_user) {
			fs.readdir('./images/Baka', (err, files) => {
				const list_img = []
				files.forEach(file => {
				  list_img.push(file);
				});
				const img = list_img[Math.round(Math.random() * (list_img.length))];
				const Embed = new Discord.RichEmbed()
					.setColor('#ff0000')
					.setDescription('Baka-'+mentionned_user+" !")
					.attachFiles(['./images/Baka/'+img])
					.setImage('attachment://'+img)
				message.channel.send(Embed);
			});
		} else {
			message.channel.send('You have to tag someone, you stupid !');
		}
	},
};

const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'sad',
	description: 'Reply with a sad image',
	execute(message, args, mentionned_user) {

        fs.readdir('./images/Sad', (err, files) => {
			const list_img = []
			files.forEach(file => {
			  list_img.push(file);
			});
			const img = list_img[Math.floor(Math.random() * (list_img.length))];
			const Embed = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.setDescription(message.author+" is sad... :sob:")
				.attachFiles(['./images/Sad/'+img])
				.setImage('attachment://'+img)
			message.channel.send(Embed);
		});
	},
};

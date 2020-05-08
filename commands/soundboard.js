const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require("discord-ytdl-core");

const audiofiles = fs.readdirSync('./sounds').filter(file => file.endsWith('.js'));
const audios = []
for (const file of audiofiles) {
    const audio = require(`../sounds/${file}`);
    audios.push(audio)
}

module.exports = {
	name: 'soundboard',
	description: 'Play sounds in a voice chat. To list the sounds, you can use the command soundboard list.',
	execute(message, args, mentionned_user) {
        if(args[0]=="list") {
            embed = new Discord.MessageEmbed()
            .setTitle("Sounds list")
            .setDescription("Use the command soundboard followed by the sound name.")
            .setColor('#ff0000')
            for(audio_file of audios) {
                embed.addFields({name: `Title: ${audio_file.name}`, value: `Command: ${audio_file.command}`});
            }
            message.channel.send(embed)
        }
        else if (audios.find( ({ command }) => command === args[0] )) {
            sound = audios.find( ({ command }) => command === args[0] )

            if (!message.member.voice.channel) return message.channel.send("You have to be in a voice channel baka !");
            let stream = ytdl(sound.url, {
                filter: "audioonly",
                encoderArgs: [
                    '-af',
                    'equalizer=f=40:width_type=h:width=50:g=10'
                ] // FFmpeg args array (optional)
            });
            
            message.member.voice.channel.join()
            .then(connection => {
                connection.play(stream, {
                    type: "opus" // type: opus is compulsory because this package returns opus stream
                })
                .on("finish", () => {
                    message.guild.me.voice.channel.leave();
                })
            });

        } else if (args[0]==null){
            message.channel.send("You have to enter a sound name, baka !")
        } else {
            message.channel.send("That's not a sound name, baka !")
        }
	},
};
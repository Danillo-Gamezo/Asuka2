const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'baka-license',
	description: 'Reply with a baka license image',
	execute(message, args, mentionned_user) {

        // Connection to the database
        const sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            // SQLite only
            storage: 'database.sqlite',
        });
        //Defining Bakas table
        const Bakas = sequelize.define('bakas', {
            userID: {
                type: Sequelize.INTEGER,
                unique: true,
            },
            baka: Sequelize.INTEGER
        });
        Bakas.sync();

        if(message.author.id=="121616589866008579") {

            const Embed = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription("You of course are the biggest baka of all.")
                .attachFiles(['./images/Baka-license/original.png'])
                .setImage('attachment://original.png')
            message.channel.send(Embed);
            
        } else {
            GetBaka(Bakas,message)
        }
	},
};

async function GetBaka(Bakas, message) {
    try {
        isBaka = await Bakas.findOne({ where: { userID: message.author.id } });
        if( ((Math.random()<0.25) && (isBaka==null)) || (isBaka!=null && isBaka.get('baka')==1) ) {

            // We add the user as baka in the db
            if(isBaka==null) {
                StoreBaka(Bakas,1,message.author.id);
            }

            const Embed = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription("Here's your baka license.")
                .attachFiles(['./images/Baka-license/original.png'])
                .setImage('attachment://original.png')
            message.channel.send(Embed);

        } else {

            // We add the user as non-baka in the db
            if(isBaka==null) {
                StoreBaka(Bakas,0,message.author.id);
            }

            message.channel.send("You have to be a big baka to have a license. Being baka is not enough !");

        }
    } catch(error) {
        console.log(error);
    }
}

async function StoreBaka(Bakas, baka_value, userID)  {
    try {
        // We add the user as baka or not in the db
        const result = await Bakas.create({
            userID: userID,
            baka: baka_value,
        });
    } catch(error) {
        console.log(error);
    }
}
# AsukaBot
AsukaBot is a Discord bot that provide functionnalities and fun for your Discord server.

**If you are going to host the bot on your own machine or on a VPS, I recommend you to remove this line in "bot.js" for security reasons:**

```require('http').createServer().listen(3000)``` 

![Example](https://i.postimg.cc/hPY25KjN/unknown.png)

Table of content
================
<!--ts-->
   * [Requirements](https://github.com/Gakamine/AsukaBot#requirements)
      * [Pre-requirements](https://github.com/Gakamine/AsukaBot#pre-requirements)
      * [NPM Dependencies](https://github.com/Gakamine/AsukaBot#npm-dependencies)
   * [Setting up a local environment](https://github.com/Gakamine/AsukaBot#setting-up-a-local-environment)
   * [Add commands](https://github.com/Gakamine/AsukaBot#add-commands)
   * [Customization](https://github.com/Gakamine/AsukaBot#customization)
   * [Host your bot](https://github.com/Gakamine/AsukaBot#host-your-bot)
      * [VPS](https://github.com/Gakamine/AsukaBot#host-your-bot)
      * [Zeit](https://github.com/Gakamine/AsukaBot#for-zeit)
      * [Heroku](https://github.com/Gakamine/AsukaBot#for-heroku)
   * [Additional information](https://github.com/Gakamine/AsukaBot#additional-information)
<!--te-->

## REQUIREMENTS

### PRE-REQUIREMENTS

| Requirement                         | Version used |
|-------------------------------------|--------------|
|__[NodeJS](https://nodejs.org/en/)__ | v10.15.2     |
|__[NPM](https://www.npmjs.com/)__    | v6.13.4      |

### NPM DEPENDENCIES

| Dependencie                                               | Version used | Use                              |
|-----------------------------------------------------------|--------------|----------------------------------|
|__[discord.io](https://www.npmjs.com/package/discord.io)__ | v2.5.3       | Simple functions for Discord API |
|__[discord.js](https://www.npmjs.com/package/discord.js)__ | v11.5.1      | Simple functions for Discord API |
|__[dotenv](https://www.npmjs.com/package/dotenv)__         | v8.2.0       | Setup environnement variables    |
|__[winston](https://www.npmjs.com/package/winston)__       | v3.2.1       | Create event logs                |

## Setting up a local environment
Before setting up a local environment, you need to create an application on the [Discord developper's dashboard](https://discordapp.com/developers/applications). Once you have created your application, you'll have to go in the "Bot" menu and get your "Token". Do not share it, it gives a complete access to your bot.

Clone/download the project.

Before running the script, it will need your bot token. Create a file named ".env" and add the following line:

```token="<Your Token Here>"```

You can now run the script in a terminal with the following command: ```node bot.js```

## Add commands
If you want to add your customized command, you will need to create a file in the "commands" directory. Your file will have to contain the following lines:
```
const Discord = require('discord.js');
module.exports = {
	name: '<Name of your command>',
	description: '<Description of your command>',
	execute(message, args, mentionned_user) {
    		// The actions executed by your command
	},
};
```
You'll have to import the command in the main script. Edit the file "bot.js" and add in the "switch case" these lines:
```
case '<Prefix of the command>':
  client.commands.get('<Name set in the command file>').execute(message, args, mentionned_user);
break;
```
You can use the commands already added as examples.
If you need multiple arguments in your command, you can access it in your command file in listing all values stored in the "args" variable. The variable "mentionned_user" will automatically contain user information if a user is tagged. If no one is tagged or there is an invalid tag, the variable will be set as undefined.

__Example:__
```
.asuka <command argument> <argument 0> <argument 1> <tagged user>
```
The information are accessible with "args[0]", "args[1]" and "mentionned_user".

Use the [DiscordJS documentation](https://discordjs.guide/) to make your own command with all the functionnalities offered by DiscordJS.

If you need to add images, please create a subfolder with the name of you command in the "images" folder. To import all the images in your command file, use these lines:
```
fs.readdir('./images/Baka', (err, files) => {
	const list_img = []
	files.forEach(file => {
		list_img.push(file);
	});
        // The lines of code where you need the list of images
});
```
If you need to select a random image:
```
const your_variable = list_img[Math.round(Math.random() * (list_img.length))];
```

If you need more integration from my script or have recommendations to make please [open an issue on Github](https://github.com/Gakamine/AsukaBot/issues). Please, do a Pull Request if you want to add a command that you think is a good enhancement for the bot. If you want to use this as boilerplate code, fork this project.

## Customization
If you want to edit the message prefix that invoke the bot, edit the constant "prefix" in the "bot.js" file.
If you want to add images for a command, do a Pull Request with your new images in the "images/<command>" folder.
More customization are available on the [Discord developper's dashboard](https://discordapp.com/developers/applications).

## Host your bot
You can host the bot on Heroku, Zeit or on a VPS.
I personnally use Zeit because it's easier to setup but the explanations can be applied for Heroku. Hosting on a VPS will just require you to upload the ".env"  file and start the script in a terminal with the command ```node bot.js```.
Heroku and Zeit are mainly made for the web, that's why both will be waiting for a Web reponse. This line in "bot.js" make the script working on the hosters:

```require('http').createServer().listen(3000)``` 

**If you are going to host the bot on your own machine or on a VPS, I recommend you to remove this line for security reasons.**

### For Zeit

1. Create an account on [Zeit](https://zeit.co/).
2. You'll need to set environment key on Zeit. I invite you to [download the Zeit CLI](https://zeit.co/download) to do this.
3. Once you have downloaded the Zeit CLI, type in a terminal pointing on the source code folder:

```now login``` and follow the instructions to connect to your Zeit account.

```now init```

4. Create a file named "now.json" with this structure:
```
{
   "build": {
        "env": {
            "token": "<Your bot token>"
        }
    }
}
```

5. Type the following commands:

```now --prod```

```now scale <your-deployment-link>.now.sh sfo1 1``` or Zeit will shut the script if the server don't receive any request in the ~10min.

Now your bot should be working.
If you have a problem with the Zeit CLI, here's the [documentation](https://zeit.co/docs).

### For Heroku

1. Create an account on [Heroku](https://.heroku.com/).
2. Create an application/project.
3. In the settings tab of you project, add an environment variable with the name "token" and as the value of your bot token.
4. I invite you to [download the heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to make it easier.
5. [Download Git](https://git-scm.com/).
6. Once you have downloaded the Heroku CLI, type in a terminal pointing on the source code folder:

```heroku login``` and follow the instructions to connect to your Heroku account.

```heroku create```

```git push heroku master```

```heroku ps:scale web=1``` or Heroku will shut the script if the server don't receive any request in the ~10min.

Now your bot should be working.
If you have a problem with the Heroku CLI, here's the [documentation](https://devcenter.heroku.com/articles/heroku-cli).

## Additional information
I'd like to thanks all the contributors on this project and the user that will use the bot.
If you need more details on the documentation, questions or recommendations I'd be glad to help you. Please [open an issue on Github](https://github.com/Gakamine/AsukaBot/issues).

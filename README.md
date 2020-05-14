# AsukaBot
AsukaBot is a Discord bot that provide functionalities and fun for your Discord server.

![Example](https://i.postimg.cc/hPY25KjN/unknown.png)

Table of content
================
<!--ts-->
   * [Requirements](#requirements)
      * [Pre-requirements](#pre-requirements)
      * [NPM Dependencies](#npm-dependencies)
   * [Setting up a local environment](#setting-up-a-local-environment)
   * [Add commands](#add-commands)
   * [Customization](#customization)
   * [Host your bot](#host-your-bot)
      * [VPS](#host-your-bot)
      * [Zeit](#for-zeit)
      * [Heroku](#for-heroku)
   * [Additional information](#additional-information)
<!--te-->

## REQUIREMENTS

### PRE-REQUIREMENTS

| Requirement                         | Version used |
|-------------------------------------|--------------|
|__[NodeJS](https://nodejs.org/en/)__ | v12.16.3     |
|__[NPM](https://www.npmjs.com/)__    | v6.14.4      |

### NPM DEPENDENCIES

| Dependence                                                              | Version used | Usage                            |
|-------------------------------------------------------------------------|--------------|----------------------------------|
|__[discord.io](https://www.npmjs.com/package/discord.io)__               | v2.5.3       | Simple functions for Discord API |
|__[discord.js](https://www.npmjs.com/package/discord.js)__               | v11.5.1      | Simple functions for Discord API |
|__[dotenv](https://www.npmjs.com/package/dotenv)__                       | v8.2.0       | Setup environment variables      |
|__[winston](https://www.npmjs.com/package/winston)__                     | v3.2.1       | Create event logs                |
|__[sodium](https://www.npmjs.com/package/sodium)__                       | v3.0.2       | Audio performance                |
|__[@discordjs/opus](https://www.npmjs.com/package/@discordjs/opus)__     | v0.3.2       | Plays audio                      |
|__[discord-ytdl-core](https://www.npmjs.com/package/discord-ytdl-core)__ | v2.0.1       | Read Youtube audio               |

You will also need to install FFMpeg on your OS.

## Setting up a local environment
Before setting up a local environment, you need to create an application on the [Discord developer's dashboard](https://discordapp.com/developers/applications). Once you have created your application, you'll have to go in the "Bot" menu and get your "Token" and "client id". Do not share it, it gives complete access to your bot.

Clone/download the project.

Before running the script, it will need your bot token. Create a file named ".env" and add the following line:

```
token="<Your Token Here>"
id="<Client id>"
```
You can additionally add a value ```PORT=<The port you want to listen>``` if you use Zeit or Heroku hosting.

You can now run the script in a terminal with the following command: ```node bot.js```

You can add your bot to your server by copying this link in your browser: ```https://discordapp.com/oauth2/authorize?client_id=<Client Id>&scope=bot```. You can find your client ID on the [Discord developer's dashboard](https://discordapp.com/developers/applications) in "General information".

## Add commands
If you want to add your customized command, you will need to create a file in the "commands" directory. Your file will have to contain the following lines:
```
const Discord = require('discord.js');
module.exports = {
	name: '<Name of your command>',
	description: '<Description of your command>',
	execute(message, args, mentioned_user) {
    		// The actions executed by your command
	},
};
```
You'll have to import the command in the main script. Edit the file "bot.js" and add in the "switch case" these lines:
```
case '<Prefix of the command>':
  client.commands.get('<Name set in the command file>').execute(message, args, mentioned_user);
break;
```
You can use the commands already added as examples.
If you need multiple arguments in your command, you can access it in your command file in listing all values stored in the "args" variable. The variable "mentioned_user" will automatically contain user information if a user is tagged. If no one is tagged or there is an invalid tag, the variable will be set as undefined.

__Example:__
```
.asuka <command argument> <argument 0> <argument 1> <tagged user>
```
The information are accessible with "args[0]", "args[1]" and "mentioned_user".

Use the [DiscordJS documentation](https://discordjs.guide/) to make your own command with all the functionalities offered by DiscordJS.

If you need to add images, please create a subfolder with the name of your command in the "images" folder. To import all the images in your command file, use these lines:
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
More customization are available on the [Discord developer's dashboard](https://discordapp.com/developers/applications).

## Host your bot
You can host the bot on Heroku, Zeit or on a VPS.
I personally use Heroku. Hosting on a VPS will just require you to upload the ".env"  file and start the script in a terminal with the command ```node bot.js```.
Heroku and Zeit are mainly made for the web, that's why both will be waiting for a Web reponse. This line in "bot.js" make the script working on the hosts:

```
const {createServer} = require('http')
const server = createServer(() => {})
server.listen(process.env.PORT)
``` 

**You have to define a port in the environment file.**

### For Zeit

**Zeit is not working with this project. I'm trying to figure out why.**

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

```now scale <your-deployment-link>.now.sh sfo1 1``` or Zeit will shut the script if the server doesn't receive any request in the ~10min. You'll have to type this command every time you'll deploy a new version.

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

```git init``` 

```heroku git:remote -a <Heroku Appname>```

```git push heroku master```

```heroku ps:scale web=1``` or Heroku will shut the script if the server doesn't receive any request in the ~10min.

Now your bot should be working.
If you have a problem with the Heroku CLI, here's the [documentation](https://devcenter.heroku.com/articles/heroku-cli).

## Additional information
I'd like to thank all the contributors on this project and the user that will use the bot.
If you need more details on the documentation, questions or recommendations I'd be glad to help you. Please [open an issue on Github](https://github.com/Gakamine/AsukaBot/issues).

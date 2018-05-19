//discord bot
const Discord = require('discord.js');
const client = new Discord.Client();
const BotToken = process.env.BotToken;
var request = require('request');
const util = require('util');
var stream = require('./streamcheck.js');


var InflatabelTypes = new Array ();
InflatabelTypes[0] = " parade balloon";
InflatabelTypes[1] = " balloonie";
InflatabelTypes[2] = "";
InflatabelTypes[3] = " inflatable";

var Species = new Array ();
Species[0] = "fox";
Species[1] = "turtle";
Species[2] = "bunny";
Species[3] = "skunk";
Species[4] = "dragon";
Species[5] = "dragoness";
Species[6] = "renamon";
Species[7] = "guilmon";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
	
	if(msg.author.bot) return; //no bot to bot chatter
	if (!msg.content.startsWith(config.prefix)) return;

  
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
	switch (command) {
		case "ping" :
		 msg.reply('Pong!');
		break;
		case "off" :
			client.user.setStatus("dnd");
		break;
		case "on" :
			client.user.setStatus("online");
		break;
		case "help" :
			msg.author.sendMessage("Hi Sai Bot. \n Current commands are !ping (returns a pong if the bot is active) \n !tf [type][species](defaults to random from a list. e.g. inflatable)(defaults to random from another list e.g. fox)\n !hug and !help (show's this help pm)");
		break;
		case "tf" :
		 var author = msg.author; 
		  var i = Math.floor(InflatabelTypes.length*Math.random())
		  var i2 = Math.floor(Species.length*Math.random())
		  console.log(command);
		   
		   //blue guilmon fix.
		  if(msg.author.tag.toString() == "Cirus Kel#9823" && i2 == 7)
		  {
			i2 -= 1;
		  }
		  if(msg.member.roles.some(r=>["LOVED GOD OF INFLATABLES"].includes(r.name)))
		  {
			i2 = 2;
		  }
		   
		  if(!Array.isArray(args) || args.length === 0)
		  {
			  if(i > 2)
			  {
				msg.channel.send('Sai blesses ' + author + ' with an' + InflatabelTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!');

			  }
			  else
			  {
				msg.channel.send('Sai blesses ' + author + ' with a' + InflatabelTypes[i] + ' ' + Species[i2] +  ' ' + 'transformation!');

			  }
			  
			 
		  }
		  else if (args.length == 1)
		  {
			   msg.channel.send('Sai blesses ' + author + ' with a ' + args[0] + ' ' + Species[i2] +  ' ' + 'transformation!');
				return;
		  }
		  else if(args.length == 2)
		  {
			   msg.channel.send('Sai blesses ' + author + ' with a ' + args[0] + ' ' + args[1] +  ' ' + 'transformation!');
			   return;
		  }
		break;
		case "twitch" : 
		if (args.length == 1)
		  {
			  stream.checkStream(args[0], config.twitchtoken, function(returncall)
				{
				msg.reply(util.format("", returncall));
				});
		  }
		  else
		  {
			  msg.reply('Please enter the twitch channel name (as it appears in the url e.g. edmazing ...or someone who actually streams a lot...)');
		  }
		
		break;
		case "hug" : 
		 var author = msg.author; 
		msg.author.sendMessage("The Sai bot hugs " +  author + "");
		break;
		default:
		msg.channel.send('The Sai bot meditates attempting to understand your command better.');
		break;
	}
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'shrine-artificial-intellegence');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

// Create an event listener for leaving guild members
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'shrine-artificial-intellegence');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`${member} has left the server`);
});

client.login(config.token);

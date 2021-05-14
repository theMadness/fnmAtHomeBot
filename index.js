const express = require('express');
const app = express();
const port = 3000;
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

const {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCode,
} = require('./fnmCodeManager.js');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const authorHasRole = (msg, roles) => msg.member.roles.cache.some(role => roles.includes(role.name));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const dmCommandsHelp = `
**!help**: Get a list of commands.
**!addCodes [...]**: Loads FNM-at-home codes in the database.
**!checkCodes**: Displays a list of unused FNM-at-home codes in the database.
**!checkLogs**: Displays a log of which user reiceved which code.
`.trim();
    const channelCommandsHelp = `
**!fnmCode @player1 @player2**: Sends a code to each of the tagged players.
`.trim();

  if (msg.channel.type !== 'dm') {
    switch(true) {
      case msg.content.startsWith('!fnmCode '): handleCode(msg); break;
    };
  } else {
    switch(true) {
      case msg.content.startsWith('!addCodes '): handleHopperLoad(msg); break;
      case msg.content === '!checkCodes': handleHopperCheck(msg); break;
      case msg.content === '!checkLogs': handleCodeLog(msg); break;
      case msg.content === '!help': 
        msg.channel.send(new MessageEmbed({
          title: 'DM Commands',
          description: dmCommandsHelp,
        })).then(() => msg.channel.send(new MessageEmbed({
          title: '#events-and-fnm Commands',
          description: channelCommandsHelp,
        })));
        break;
    };
  }
});


const handleHelp = msg => {
  
};
// You really don't want your token here since your repl's code
// is publically available. We'll take advantage of a Repl.it 
// feature to hide the token we got earlier. 
client.login(process.env.DiscordBotToken);

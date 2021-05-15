const express = require('express');
const app = express();
const port = 3000;
const {Client, MessageEmbed} = require('discord.js');
const client = new Client();

const {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCode,
} = require('./fnmCodeManager.js');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  const dmCommandsHelp = `
**!help**: Get a list of commands.
**!addCodes [...]**: Loads FNM-at-home codes in the database.
**!checkCodes**: Displays a list of unused FNM-at-home codes in the database.
**!checkLogs**: Displays a log of which user received which code.
`.trim();
  const channelCommandsHelp = `
**!fnmCode @player1 @player2**: Sends a code to each of the tagged players.
`.trim();

  if (msg.channel.type !== 'dm') {
    switch (true) {
      case msg.content.startsWith('!fnmCode '): handleCode(msg); break;
    }
  } else {
    switch (true) {
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
    }
  }
});

client.login(process.env.DiscordBotToken).then();

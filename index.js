const express = require('express');
const app = express();
const port = 3000;
const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({
  ws: (new Intents(['GUILD_MEMBERS'])),
});

const {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCodeRequest,
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
      case null !== msg.content.match(/^!fnmCode /i): handleCodeRequest(msg).then(); break;
    }
  } else {
    switch (true) {
      case null !== msg.content.match(/^!addCodes /i): handleHopperLoad(msg).then(); break;
      case null !== msg.content.match(/^\s*!checkCodes\s*$/i): handleHopperCheck(msg).then(); break;
      case null !== msg.content.match(/^\s*!checkLogs\s*$/i): handleCodeLog(msg).then(); break;
      case null !== msg.content.match(/^\s*!help\s*$/i):
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

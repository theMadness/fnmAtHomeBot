const {canManageHopper, canRequestCode} = require('./permissions.js');
const extractCodes = require('./fnmCodeDeserializer');
const {addCodes, getUnusedCodes, popCode} = require('./fnmCodeRepository.js');
const {logCodeUse, getCodeUseList} = require('./codeLogRepository.js');

const handleHopperLoad = (msg) => canManageHopper(msg) &&
    addCodes(extractCodes(msg.content))
        .then((count) => msg.reply(`Added ${count} Codes`));

const handleHopperCheck = (msg) => canManageHopper(msg) && getUnusedCodes().then((value) => msg.reply(value || 'empty'));

const handleCodeLog = (msg) => canManageHopper(msg) && getCodeUseList().then((value) => msg.reply(value));

const sendCodeToUser = async (user) => {
  const code = await popCode();
  user.send(`
Thank you for participating to this week's FNM at Home event with PGSs, you can now redeem this code in MtG Arena for some sweet rewards:
\`${code}\`

Remember to join us again next week, for a new event, and a new chance to chat and play with your fellow planeswalkers.
`.trim());
  await logCodeUse(user, code);
};

const handleCodeRequest = async (msg) => {
  if (!canRequestCode(msg)) return;

  for (const userKeyValue of await msg.mentions.users) {
    const user = userKeyValue[1];
    await sendCodeToUser(user);
  }

  if (msg.mentions.users.size === 1) {
    msg.reply(`Sent 1 code`);
  } else {
    msg.reply(`Sent ${msg.mentions.users.size} codes`);
  }
};

module.exports = {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCodeRequest,
};

const {canManageHopper, canRequestCode} = require('./permissions.js');
const extractCodes = require('./fnmCodeDeserializer');
const {addCodes, getUnusedCodes, popCode} = require('./fnmCodeRepository.js');
const {logCodeUse, getCodeUseList} = require('./codeLogRepository.js');

/**
 * @param {Message} msg
 * @return {Promise<any> | PromiseLike<any>}
 */
const handleHopperLoad = async (msg) => await canManageHopper(msg) &&
    msg.reply(`Added ${await addCodes(extractCodes(msg.content))} Codes`);

/**
 * @param {Message} msg
 * @return {Promise<any> | PromiseLike<any>}
 */
const handleHopperCheck = async (msg) => await canManageHopper(msg) &&
    msg.reply((await getUnusedCodes()) || 'empty');

/**
 * @param {Message} msg
 * @return {boolean|Promise<string | *>}
 */
const handleCodeLog = async (msg) => await canManageHopper(msg) &&
    msg.reply(await getCodeUseList());

/**
 * @param {User} user
 * @return {Promise<void>}
 */
const sendCodeToUser = async (user) => {
  const code = await popCode();
  await user.send(`
Thank you for participating to this week's FNM at Home event with PGSs, you can now redeem this code in MtG Arena for some sweet rewards:
\`${code}\`

Remember to join us again next week, for a new event, and a new chance to chat and play with your fellow planeswalkers.
`.trim());
  await logCodeUse(user.username, code);
};

/**
 * @param {Message} msg
 * @return {Promise<Message|null>}
 */
const handleCodeRequest = async (msg) => {
  if (!canRequestCode(msg)) return Promise.resolve(null);

  for (const userKeyValue of await msg.mentions.users) {
    /** @var {User} user */
    const user = userKeyValue[1];
    await sendCodeToUser(user);
  }

  if (msg.mentions.users.size === 1) {
    return msg.reply(`Sent 1 code`);
  } else {
    return msg.reply(`Sent ${msg.mentions.users.size} codes`);
  }
};

module.exports = {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCodeRequest,
};

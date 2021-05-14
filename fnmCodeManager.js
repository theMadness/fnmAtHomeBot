const {
  addCodes,
  getUnusedCodes,
} = require('./fnmCodeRepository.js');
const {
  logCodeUse,
  getCodeUseList,
} = require('./codeLogRepository.js');
const {
  canManageHopper,
  canRequestCode,
} = require('./permissions.js');

const extractCodes = messageBody => console.log(messageBody);

const handleHopperLoad = msg => canManageHopper(msg) && addCodes(extractCodes(msg.content)).then(() => msg.reply('Added Codes'));

const handleHopperCheck = msg => canManageHopper(msg) && getUnusedCodes().then(value => msg.reply(value));

const handleCodeLog = msg => canManageHopper(msg) && getCodeUseList().then(value => msg.reply(value));

const handleCode = msg => canRequestCode(msg) && getCodeUseList().then(value => msg.reply(value));

exports = {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCode,
};
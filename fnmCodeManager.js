const {canManageHopper, canRequestCode} = require('./permissions.js');
const extractCodes = require('./fnmCodeDeserializer');
const {addCodes, getUnusedCodes} = require('./fnmCodeRepository.js');
const {logCodeUse, getCodeUseList} = require('./codeLogRepository.js');

const handleHopperLoad = (msg) => canManageHopper(msg) &&
    addCodes(extractCodes(msg.content))
        .then((count) => msg.reply(`Added ${count} Codes`));

const handleHopperCheck = (msg) => canManageHopper(msg) && getUnusedCodes().then((value) => msg.reply(value || 'empty'));

const handleCodeLog = (msg) => canManageHopper(msg) && getCodeUseList().then((value) => msg.reply(value));

const handleCodeRequest = (msg) => canRequestCode(msg) && getCodeUseList().then((value) => msg.reply(value));

module.exports = {
  handleHopperLoad,
  handleHopperCheck,
  handleCodeLog,
  handleCodeRequest,
};

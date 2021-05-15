const Database = require('@replit/database');
const db = new Database();
const moment = require('moment-timezone');

const logCodeUse = async (username, code) => {
  const logs = (await db.get('logs')) || [];
  logs.push({
    username,
    code,
    timestamp: moment().tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss'),
  });

  await db.set('logs', logs);
};

const getCodeUseList = async () => {
  const logs = await db.get('logs');

  return logs.map((log) => `${log.timestamp}: Sent \`${log.code}\` to **${log.username}**.`);
};

module.exports = {
  logCodeUse,
  getCodeUseList,
};

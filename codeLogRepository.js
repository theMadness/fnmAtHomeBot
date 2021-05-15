const Database = require('@replit/database');
const db = new Database();
const moment = require('moment-timezone');

const logCodeUse = async (username, code) => {
  const logs = await db.get('logs');
  logs.push({
    username,
    code,
    timestamp: moment().tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss'),
  });

  await db.set('logs', logs);
};

const getCodeUseList = () => db.get('logs');

module.exports = {
  logCodeUse,
  getCodeUseList,
};

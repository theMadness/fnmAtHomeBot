const Database = require('@replit/database');
const db = new Database();

const logCodeUse = (user, code) => db.set('test2', code);
const getCodeUseList = () => db.get('test2');

exports = {
  logCodeUse,
  getCodeUseList,
};

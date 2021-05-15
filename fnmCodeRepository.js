const Database = require('@replit/database');
const db = new Database();

const addCodes = (codes) => {
  db.set('codes', codes);
};
const getUnusedCodes = () => db.get('test');

module.exports = {
  addCodes,
  getUnusedCodes,
};

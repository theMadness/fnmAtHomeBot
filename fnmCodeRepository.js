const Database = require('@replit/database');
const db = new Database();

const addCodes = (codes) => db.set('codes', codes).then(() => codes.length);
const getUnusedCodes = () => db.get('codes');

module.exports = {
  addCodes,
  getUnusedCodes,
};

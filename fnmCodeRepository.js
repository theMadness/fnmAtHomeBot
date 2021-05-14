const Database = require("@replit/database")
const db = new Database()

const addCodes = codes => db.set('test', codes);
const getUnusedCodes = () => db.get('test');

exports = {
  addCodes,
  getUnusedCodes,
};
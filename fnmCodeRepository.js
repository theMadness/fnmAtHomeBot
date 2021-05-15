const Database = require('@replit/database');
const db = new Database();

const addCodes = (codes) => db.set('codes', codes).then(() => codes.length);
const getUnusedCodes = () => db.get('codes');
const popCode = async () => {
  const codes = await db.get('codes');
  const firstCode = codes.shift();
  await db.set('codes', codes);

  return firstCode;
};

module.exports = {
  addCodes,
  getUnusedCodes,
  popCode,
};

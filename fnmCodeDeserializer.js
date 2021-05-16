/**
 * @param {string} messageBody
 * @return {string[]}
 */
const extractCodes = (messageBody) => messageBody.replace(/^!addCodes\s+(.*?)\s*$/i, '$1').split(/[ \n,/]/);

module.exports = extractCodes;

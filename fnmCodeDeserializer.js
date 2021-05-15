const extractCodes = (messageBody) => messageBody.replace(/^!add[cC]odes\s+(.*?)\s*$/, '$1').split(/[ \n,/]/);

module.exports = extractCodes;

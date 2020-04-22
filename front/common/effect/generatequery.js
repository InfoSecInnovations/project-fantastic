const generateQuery = obj => Object.entries(obj).map(v => `${v[0]}=${v[1]}`).join('&')

module.exports = generateQuery
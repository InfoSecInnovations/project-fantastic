const ParseValue = require('./parsevalue')

const parseObject = (obj, output) => 
  obj && Object.entries(obj).reduce((result, v) => ({...result, [v[0]]: ParseValue(v[1], output)}), {})

module.exports = parseObject
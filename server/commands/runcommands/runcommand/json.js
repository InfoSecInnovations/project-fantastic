const ProcessJSON = require('../../../util/processjson')
const ProcessJSONObject = require('../../../util/processjsonobject')

/**
 * Get command value from JSON
 * @param {import('../index').Command} command 
 * @param {string | {}} output 
 */
const json = (command, output) => output.map(v => {
  const mapping = command.run.result
  if (typeof mapping === 'string') return ProcessJSON(mapping, v)
  return ProcessJSONObject(mapping, v)
})

module.exports = json


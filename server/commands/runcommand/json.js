const ProcessJSON = require('../../util/processjson')
const ProcessJSONObject = require('../../util/processjsonobject')

const json = (command, output) => output.map(v => {
  const mapping = command.run.result
  if (typeof mapping === 'string') return ProcessJSON(mapping, v)
  return ProcessJSONObject(mapping, v)
})

module.exports = json


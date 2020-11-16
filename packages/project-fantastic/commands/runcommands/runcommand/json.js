const ExtractValue = require('../../../util/extractvalue')
const ExtractObjectValues = require('../../../util/extractobjectvalues')

/**
 * Get command value from JSON
 * @param {{} | string} mapping
 * @param {{}} output 
 */
const json = (mapping, output) => output.map(v => {
  if (typeof mapping === 'string') return ExtractValue(mapping, v)
  return ExtractObjectValues(mapping, v)
})

module.exports = json


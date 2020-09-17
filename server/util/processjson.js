const IsValid = require('fantastic-utils/isvalid')

/** 
 * Grab value from JSON output using the method specified in a user script. 
 * @param {(Object | string | undefined)} value_data - the data from the script defining how we should get the value from the output.
 * @param {Object} output - the JSON output we are processing.
 */
const processJSON = (value_data, output) => {
  if (typeof value_data == 'undefined') return
  if (typeof output !== 'object') {
    if (value_data.text) return output
  }
  if (typeof value_data !== 'object') return output[value_data]
  if (value_data.map) return `${value_data.labelled ? `${value_data.key}: ` : ''}${value_data.map[output[value_data.key]]}`
  if (value_data.labelled) return IsValid(output[value_data.labelled]) ? `${value_data.labelled}: ${output[value_data.labelled]}` : undefined
  if (value_data.static) return value_data.static
  if (value_data.bool) {
    const value = output[value_data.bool] == 1
    if (value_data.true !== undefined && value_data.false !== undefined) return value ? value_data.true : value_data.false
    return value_data.inverse ? !value : value
  }
  if (value_data.combine) return value_data.combine.map(v => parseValue(v, output)).join('')
  if (value_data.date) {
    const value = output[value_data.date]
    const start_index = value.indexOf('(') + 1
    const end_index = value.indexOf(')')
    return {date: parseInt(value.slice(start_index, end_index))}
  }
  if (value_data.key_value_string) {
    const obj = output.split(',').reduce((result, v) => {
      const split = v.split('="')
      return {...result, [split[0]]: split[1].replace('"', '')}
    }, {})
    return obj[value_data.key_value_string]
  }
}

module.exports = processJSON
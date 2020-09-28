const IsValid = require('fantastic-utils/isvalid')

/** 
 * Get a value from raw data. 
 * @param {({} | string | undefined)} value_mapping - the way we should get the data.
 * @param {{} | string} raw_data
 */
const extractValue = (value_mapping, raw_data) => {
  if (typeof value_mapping == 'undefined') return
  if (typeof raw_data !== 'object') {
    if (value_mapping.text) return raw_data
  }
  if (typeof value_mapping !== 'object') return raw_data[value_mapping]
  if (value_mapping.map) return `${value_mapping.labelled ? `${value_mapping.key}: ` : ''}${value_mapping.map[raw_data[value_mapping.key]]}`
  if (value_mapping.labelled) return IsValid(raw_data[value_mapping.labelled]) ? `${value_mapping.labelled}: ${raw_data[value_mapping.labelled]}` : undefined
  if (value_mapping.static) return value_mapping.static
  if (value_mapping.bool) {
    const value = raw_data[value_mapping.bool] == 1
    if (value_mapping.true !== undefined && value_mapping.false !== undefined) return value ? value_mapping.true : value_mapping.false
    return value_mapping.inverse ? !value : value
  }
  if (value_mapping.combine) return value_mapping.combine.map(v => extractValue(v, raw_data)).join('')
  if (value_mapping.date) {
    const value = raw_data[value_mapping.date]
    const start_index = value.indexOf('(') + 1
    const end_index = value.indexOf(')')
    return {date: parseInt(value.slice(start_index, end_index))}
  }
  if (value_mapping.key_value_string) {
    const obj = raw_data.split(',').reduce((result, v) => {
      const split = v.split('="')
      return {...result, [split[0]]: split[1].replace('"', '')}
    }, {})
    return obj[value_mapping.key_value_string]
  }
}

module.exports = extractValue
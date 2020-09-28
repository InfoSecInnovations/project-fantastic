const ExtractValue = require('./extractvalue')

/**
 * Grab values from raw data using the methods specified in the mapping object.
 * @param {{}} mapping - The object containing the mapping data.
 * @param {{} | string} raw_data
 * @returns {{}} An object with the same structure as the mapping object, but containing the values from the processing.
 */
const extractObjectValues = (mapping, raw_data) => 
  mapping && Object.entries(mapping).reduce((result, v) => ({...result, [v[0]]: ExtractValue(v[1], raw_data)}), {})

module.exports = extractObjectValues
const ProcessJSON = require('./processjson')

/**
 * Grab values from JSON output using the methods specified in the mapping object.
 * @param {Object} obj - The object containing the mapping data.
 * @param {Object} output - The JSON output being processed.
 * @returns {Object} An object with the same structure as the mapping object, but containing the values from the processing.
 */
const processJSONObject = (obj, output) => 
  obj && Object.entries(obj).reduce((result, v) => ({...result, [v[0]]: ProcessJSON(v[1], output)}), {})

module.exports = processJSONObject
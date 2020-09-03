const JSToPS = require('./jstops')

const js_string = js => {
  if (typeof js == 'undefined') return 'undefined'
  if (typeof js == 'number') return `${js}`
  if (typeof js == 'string') return `"${js}"`
  if (typeof js == 'boolean') return js ? 'true' : 'false'
}

/**
 * Replace placeholders in the '$key' format with corresponding values from the parameters object
 * @param {string} string 
 * @param {Object} parameters 
 * @param {('powershell'|'js')} mode
 * @returns {string}
 */
const formatString = (string, parameters, mode = 'powershell') => {
  if (!parameters) return string
  Object.entries(parameters).forEach(v => {
     // regex escape magic I found to preserve special characters when searching and replacing the key
     // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    const key_regex = new RegExp(`$${v[0]}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&', 'g'))
    string = string.replace(key_regex, mode == 'powershell' ? JSToPS(v[1]) : js_string(v[1]))
  }) 
  return string
}

module.exports = formatString
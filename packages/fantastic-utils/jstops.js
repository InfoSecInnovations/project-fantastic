/**
 * Convert a JavaScript value to a PowerShell variable
 * @param {*} js 
 * @returns {string}
 */
const JStoPS = js => {
  if (typeof js == 'undefined') return '$null'
  if (typeof js == 'number') return `${js}`
  if (typeof js == 'string') return `'${js}'`
  if (typeof js == 'boolean') return js ? 'True' : 'False'
  if (Array.isArray(js)) return js.map(js => JStoPS(js)).join()
}

module.exports = JStoPS
/**
 * Attempt to parse JSON from a string and output as an array
 * @param {string} input 
 * @returns {Object[]}
 */
const processJson = input => {
  if (!input) return []
  try {
    const obj = JSON.parse(input)
    return Array.isArray(obj) ? obj : [obj]
  }
  catch (err) {
    console.log(`Unable to parse JSON from "${input}"`)
    return []
  }
}

module.exports = processJson
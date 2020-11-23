const ReadLine = require('readline')

/**
 * Ask the user a question in the command line
 * @param {string} question 
 * @param {boolean} [hide] hide the user's input (use this for passwords)
 * @returns {Promise<string>}
 */
const getInput = (question, hide) => new Promise((resolve, reject) => {
  const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(question, answer => {
    resolve(answer)
    rl.close()
  })
  if (hide) rl._writeToOutput = () => {}
})

module.exports = getInput
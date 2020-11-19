const ReadLine = require('readline')

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
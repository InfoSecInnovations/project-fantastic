const fs = require('fs-extra')

const upgrade = () => fs.pathExists('config.json')
.then(() => fs.readJSON('config.json'))
.then(file => fs.writeJSON('config.json', {client: { nodeCountWarning: 500 }, ...file}, {spaces: '\t'}))


module.exports = upgrade
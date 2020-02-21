const FS = require('fs').promises

const getActionData = () => FS.readdir('config/actions')

module.exports = getActionData
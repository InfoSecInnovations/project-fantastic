const FS = require('fs-extra')

/**
 * Load the config file
 */
const getConfig = () => FS.readJSON('config.json')

module.exports = getConfig
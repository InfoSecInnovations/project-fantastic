const FS = require('fs-extra')

/**
 * 
 * @param {{} | undefined} filter 
 */
const getFilter = async filter => filter && FS.readJson(filter.file, {throws: false}).catch(() => null)

module.exports = getFilter
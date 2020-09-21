const FS = require('fs-extra')
const GetConfigPath = require('../../../util/getconfigpath')
const Path = require('path')

/**
 * 
 * @param {{} | undefined} filter 
 */
const getFilter = async filter => filter && GetConfigPath()
  .then(res => FS.readJson(Path.join(res, filter.file), {throws: false}))

module.exports = getFilter
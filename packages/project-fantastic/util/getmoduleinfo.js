const FS = require('fs-extra')
const Path = require('path')

const getModuleInfo = name => FS.readJSON(Path.join('node_modules', name, 'info.json'))   // TODO: is there some way to use require.resolve to make this more robust?
.catch(() => ({name}))

module.exports = getModuleInfo
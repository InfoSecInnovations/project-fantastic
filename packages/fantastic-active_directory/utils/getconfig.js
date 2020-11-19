const FS = require('fs-extra')
const Path = require('path')

const getConfig = FS.readJSON(Path.join(process.cwd(), 'config.json')).then(res => res.authentication.config || {}).catch(() => ({}))

module.exports = getConfig
const FS = require('fs-extra')
const Path = require('path')
const base = require('../defaultconfig.js')

const getConfig = async () => {
  const custom = await FS.readJSON(Path.join(process.cwd(), 'config.json')).then(res => res.authentication.config || {}).catch(() => ({}))
  return {...base, ...custom}
}

module.exports = getConfig
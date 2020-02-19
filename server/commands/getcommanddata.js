const FS = require('fs').promises

const getCommandData = config => FS.readdir('config/data_sources')
  .then(res => res.reduce((result, v) => ({...result, [v]: config.data_sources && config.data_sources.includes(v)}), {}))

module.exports = getCommandData
const FS = require('fs').promises

const getCommandData = config => FS.readdir('config/data_sources')
  .then(res => res.reduce((result, v) => ({...result, [v]: config.default_commands && config.default_commands.includes(v)}), {}))

module.exports = getCommandData
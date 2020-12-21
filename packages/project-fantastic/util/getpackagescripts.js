const Path = require('path')
const FS = require('fs').promises

/**
 * get all the script paths from a module installed in the config package
 * @param {string} name 
 * @param {'actions' | 'commands' | 'tests' | 'stories'} type
 */
const getPackageScripts = (name, type) => FS.readdir(Path.join('node_modules', name, type))
  .then(res => res.map(v => v.slice(0, v.lastIndexOf('.json'))))
  .catch(() => [])

module.exports = getPackageScripts
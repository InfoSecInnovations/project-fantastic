const GetConfigPath = require('./getconfigpath')
const Path = require('path')
const FS = require('fs').promises

/**
 * get all the script paths from a module installed in the config package
 * @param {string} name 
 * @param {'actions' | 'commands' | 'tests'} type
 */
const getPackageScripts = (name, type) => GetConfigPath()
  .then(res => FS.readdir(Path.join(res, 'node_modules', name, type)))
  .then(res => res.map(v => v.slice(0, v.lastIndexOf('.json'))))
  .catch(() => [])

module.exports = getPackageScripts
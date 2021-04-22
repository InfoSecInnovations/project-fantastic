const FS = require('fs-extra')
const IsInstalled = require('is-installed')

const checkInstalled = async () => {
  const is_module = await FS.pathExists('package.json')
  if (!is_module) throw "Couldn't find package.json, please install Fantastic first using npx fantastic-cli init!"
  const fantastic_installed = await IsInstalled('@infosecinnovations/project-fantastic')
  if (!fantastic_installed) throw "Couldn't find Fantastic installation, please install Fantastic first using npx fantastic-cli init!"
  const has_config = await FS.pathExists('config.json')
  if (!has_config) throw "Fantastic installation was found, but couldn't find config.json, please initialize Fantastic first using npx fantastic-cli init!"
}

module.exports = checkInstalled
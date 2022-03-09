const FS = require('fs-extra')
const Path = require('path')

export default async (state, action, send) => {
  const packageJSON = await FS.readJSON(Path.join(state.modules[state.selectedModule].path, 'package.json'))
  packageJSON.name = state.modules[state.selectedModule].name
  await FS.writeJSON(Path.join(state.modules[state.selectedModule].path, 'package.json'), packageJSON, {spaces: '\t'})
}
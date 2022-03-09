const FS = require('fs-extra')
const Path = require('path')

export default (state, action, send) => {
  const dir = state.modules[state.selectedModule].path
  FS.writeJSON(Path.join(dir, 'info.json'), state.modules[state.selectedModule].info, {spaces: '\t'})
}
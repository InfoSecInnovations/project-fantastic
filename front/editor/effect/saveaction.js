const FS = require('fs-extra')
const Path = require('path')

export default (state, action, send) => {
  const dir = state.modules[state.selectedModule].path
  const actionDir = Path.join(dir, 'actions')
  FS.ensureDir(actionDir)
  .then(() => FS.writeJSON(Path.join(actionDir, `${state.action.filename}.json`), state.action.json, {spaces: '\t'}))
}
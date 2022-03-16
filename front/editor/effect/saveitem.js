import itemcollections from '../util/itemcollections'

const FS = require('fs-extra')
const Path = require('path')

export default (state, action, send) => {
  const dir = state.modules[state.selectedModule].path
  const itemDir = Path.join(dir, itemcollections[action.itemType])
  FS.ensureDir(itemDir)
  .then(() => FS.writeJSON(Path.join(itemDir, `${state[action.itemType].filename}.json`), state[action.itemType].json, {spaces: '\t'}))
}
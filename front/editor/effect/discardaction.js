const FS = require('fs-extra')
const Path = require('path')

export default async (state, action, send) => {
  const dir = state.modules[state.selectedModule].path
  const actionDir = Path.join(dir, 'actions')
  const exists = await FS.pathExists(actionDir)
  if (exists) {
    const filePath = Path.join(actionDir, `${state.action.filename}.json`)
    const fileExists = await FS.pathExists(filePath)
    if (fileExists) {
      const saved = await FS.readJSON(filePath)
      send({type: 'set_action', json: saved})
      send({type: 'load_action', filename: state.action.filename, action: saved})
      return
    }
  }
  send({type: 'delete_action', filename: state.action.filename})
  send({type: 'mode', mode: 'module'})
}
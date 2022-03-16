const FS = require('fs-extra')
const Path = require('path')

export default async (state, action, send) => {
  const confirmed = !action.prompt || confirm(`Really delete ${action.filename} action?`)
  if (!confirmed) return
  const dir = state.modules[state.selectedModule].path
  const actionDir = Path.join(dir, 'actions')
  const exists = await FS.pathExists(actionDir)
  if (exists) {
    const filePath = Path.join(actionDir, `${action.filename}.json`)
    const fileExists = await FS.pathExists(filePath)
    if (fileExists) await FS.rm(filePath)
  }
  send({type: 'remove_item', itemType: 'action', filename: action.filename})
}
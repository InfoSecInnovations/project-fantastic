import itemcollections from '../util/itemcollections'

const FS = require('fs-extra')
const Path = require('path')

export default async (state, action, send) => {
  const confirmed = !action.prompt || confirm(`Really discard changes to ${state[action.itemType].filename} ${action.itemType}?`)
  if (!confirmed) return
  const dir = state.modules[state.selectedModule].path
  const itemDir = Path.join(dir, itemcollections[action.itemType])
  const exists = await FS.pathExists(itemDir)
  if (exists) {
    const filePath = Path.join(itemDir, `${state[action.itemType].filename}.json`)
    const fileExists = await FS.pathExists(filePath)
    if (fileExists) {
      const saved = await FS.readJSON(filePath)
      send({type: 'set_item', itemType: action.itemType, json: saved, filename: state[action.itemType].filename})
      send({type: 'load_item', itemType: action.itemType, filename: state[action.itemType].filename})
      return
    }
  }
  send({type: 'delete_item', itemType: action.itemType, filename: state[action.itemType].filename})
  send({type: 'mode', mode: 'module'})
}
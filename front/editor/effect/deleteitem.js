import itemCollections from '../util/itemcollections'

const FS = require('fs-extra')
const Path = require('path')

export default async (state, action, send) => {
  const confirmed = !action.prompt || confirm(`Really delete ${action.filename} ${action.itemType}?`)
  if (!confirmed) return
  const dir = state.modules[state.selectedModule].path
  const itemDir = Path.join(dir, itemCollections[action.itemType])
  const exists = await FS.pathExists(itemDir)
  if (exists) {
    const filePath = Path.join(itemDir, `${action.filename}.json`)
    const fileExists = await FS.pathExists(filePath)
    if (fileExists) await FS.rm(filePath)
  }
  send({type: 'remove_item', itemType: action.itemType, filename: action.filename})
}
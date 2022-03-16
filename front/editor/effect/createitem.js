import itemCollections from "../util/itemcollections"
import SanitizeName from "../util/sanitizeName"

export default (state, action, send) => {
  const collection = state.modules[state.selectedModule][itemCollections[action.itemType]]
  let filename = prompt('Enter file name')
  while (true) {
    if (filename === null) break
    filename = SanitizeName(filename)
    if (filename && (!collection || !collection[filename])) {
      send({type: 'init_item', filename, itemType: action.itemType})
      send({type: 'set_current_item', filename, itemType: action.itemType})
      send({type: 'save_current_item', itemType: action.itemType})
      break
    }
    filename = prompt('Please enter a valid file name')
  }
}
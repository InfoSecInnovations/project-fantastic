import {h} from 'snabbdom/h'
import ItemSelector from "../../../common/itemselector"
import ModuleFromKey from "../../../../util/modulefromkey"
import ItemFromKey from "../../../../util/itemfromkey"

export default (state, send, action, index) => {
  const module = ModuleFromKey(state, action.path)
  const actionName = ItemFromKey(action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  return ItemSelector(
    state, 
    send, 
    h(
      'div.row bottom-aligned', 
      [
        h('h4', 'Action'),
        h('div', data ? data.name || actionName : 'Please select an action') 
      ]
    ), 
    '✎', 
    `scan_editor_action_selector_${index}`, 
    'action', 
    fullPath => {
      const actionModule = ModuleFromKey(state, fullPath)
      send({type: 'scan_action_path', index, path: actionModule != module ? fullPath : ItemFromKey(fullPath)})
    }
  )
}
import {h} from 'snabbdom/h'
import ItemFromKey from '../../../util/itemfromkey'
import ModuleFromKey from '../../../util/modulefromkey'
import ItemSelector from '../../common/itemselector'

export default (state, send) => h('div.column', [
  h('div.row bottom-aligned', [
    h('h4', 'Actions'),
    h('div.label', "The scan will run these actions on all valid hosts to gather the information. If you need to do something that doesn't already exist as an action, please go to the module screen and create an action first."),
    h('div.mini-button', {
      attrs: {title: 'Add Action'},
      on: {click: e => send({type: 'add_scan_action'})}
    }, '+')
  ]),
  ...(state.scan.json.actions ? state.scan.json.actions.map((action, i) => {
    const module = ModuleFromKey(state, action.path)
    const actionName = ItemFromKey(action.path)
    const data = module && actionName && module.actions && module.actions[actionName]
    return h('div', [
      ItemSelector(state, send, h('div.row bottom-aligned', [
        h('div.label', 'Action'),
        h('div', data ? data.name || actionName : 'Please select an action') 
      ]), '✎', 'scan_editor_action_selector', 'action', fullPath => {
        const actionModule = ModuleFromKey(state, fullPath)
        send({type: 'scan_action_path', index: i, path: actionModule != module ? fullPath : ItemFromKey(fullPath)})
      })
    ])
  }) : [])
])
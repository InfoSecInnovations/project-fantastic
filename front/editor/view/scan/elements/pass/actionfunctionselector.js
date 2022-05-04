import {h} from 'snabbdom/h'
import ItemFromKey from '../../../../util/itemfromkey'
import ModuleFromKey from '../../../../util/modulefromkey'
import ItemSelector from '../../../common/itemselector'

export default (state, send) => {
  const module = ModuleFromKey(state, state.scan.json.pass.failure.action.path)
  const actionName = ItemFromKey(state.scan.json.pass.failure.action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  return [
    ItemSelector(
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
      'scan_editor_failure_action_selector', 
      'action', 
      fullPath => {
        const actionModule = ModuleFromKey(state, fullPath)
        send({type: 'scan_failure_action_path', path: actionModule != module ? fullPath : ItemFromKey(fullPath)})
      }
    ),
    data ? h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-failure-action-function`}}, 'Function'),
      h('select', {
        attrs: { id: `${state.scan.filename}-scan-failure-action-function` },
        on: { input: e => send({type: 'scan_failure_action_function', value: e.target.value})}
      }, Object.entries(data.functions).map(([funcName, funcData]) => h('option', { attrs: { 
        value: funcName, 
        selected: state.scan.json.pass.failure.action.function ? funcName == state.scan.json.pass.failure.action.function : funcName == 'run'
      }}, funcName == 'run' ? 'Run (entry point)' : funcData.name || funcName)))
    ]) : undefined
  ]
}
import {h} from 'snabbdom/h'
import scanWizardBaseTasks from '../../../defaults/scanWizardBaseTasks'

export default (state, send) => [
  h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: scanWizardBaseTasks}) }
  }, 'Edit basic info'),
  h('div.button', {
    on: { click: e => {
      send({type: 'scan_wizard_action_index', index: state.scan.json.actions.length})
      send({type: 'scan_wizard_search_index', index: 0})
      send({type: 'add_scan_action'})
      send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action', 'action_search']}) 
    }}
  }, 'Add Action')
  // TODO: edit action
  // TODO: edit result handling
  // TODO: enable/disable quest
]
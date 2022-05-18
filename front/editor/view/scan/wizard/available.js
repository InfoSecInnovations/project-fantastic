import {h} from 'snabbdom/h'
import scanWizardBaseTasks from '../../../defaults/scanWizardBaseTasks'
import GetActionName from './getactionname';

export default (state, send) => [
  h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: scanWizardBaseTasks}) }
  }, 'Edit basic info'),
  h('div.button', {
    on: { click: e => {
      send({type: 'scan_wizard_action_index', index: state.scan.json.actions.length})
      send({type: 'scan_wizard_search_index', index: 0})
      send({type: 'add_scan_action'})
      send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action', 'action_search'], mandatory: true}) 
    }}
  }, 'Add Action'),
  ...state.scan.json.actions.map((action, i) => h('div.button', {
    on: { click: e => {
      send({type: 'scan_wizard_action_index', index: i})
      send({type: 'scan_wizard_search_index', index: 0})
      send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action', 'action_search']}) 
    }}
  }, `Edit ${GetActionName(state, i)} action data`))
  // TODO: edit result handling
  // TODO: enable/disable quest
]
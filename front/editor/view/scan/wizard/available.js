import {h} from 'snabbdom/h'
import scanWizardBaseTasks from '../../../defaults/scanWizardBaseTasks'
import GetActionName from './getactionname';

const questTasks = state => [
  'quest_explanation', 
  state.scan.json.parameters && state.scan.json.parameters.length ? 'quest_parameters' : undefined, 
  'quest_host_selection'
].filter(task => task)

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
  ...((state.scan.json.actions && state.scan.json.actions.map((action, i) => [
    h('div.button', {
      on: { click: e => {
        send({type: 'scan_wizard_action_index', index: i})
        send({type: 'scan_wizard_search_index', index: 0})
        send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action', 'action_search']}) 
      }}
    }, `${GetActionName(state, i)}: Edit action data`),
    h('div.button', {
      on: { click: e => {
        send({type: 'scan_wizard_action_index', index: i})
        send({type: 'scan_wizard_search_index', index: action.search.length})
        send({type: 'add_scan_search_item', index: i})
        send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_search']}) 
      }}
    }, `${GetActionName(state, i)}: Add search item`)
    // TODO: edit search item
    // TODO: remove search item
    // TODO: remove action
  ]).flat()) || []),
  h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['pass']})}
  }, 'Configure result handling'),
  state.scan.json.quest ? h('div.button', {
    on: { click: e => send({type: 'enabled_scan_quest', enabled: false})}
  }, 'Disable this scan for daily quests') : h('div.button', {
    on: { click: e => {
      send({type: 'enabled_scan_quest', enabled: true})
      send({type: 'set_wizard_tasks', itemType: 'scan', tasks: questTasks(state)})
    }}
  }, 'Enable this scan for daily quests'),
  state.scan.json.quest ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: questTasks(state)}) }
  }, 'Configure daily quest') : undefined
]
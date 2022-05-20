import {h} from 'snabbdom/h'
import scanWizardBaseTasks from '../../../defaults/scanWizardBaseTasks'
import GetActionName from './getactionname';
import GetSearchName from './getsearchname';

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
  ...((state.scan.json.actions && state.scan.json.actions.map((action, i) => {
    const actionName = GetActionName(state, i)
    return [
      h('div.button', {
        on: { click: e => {
          send({type: 'scan_wizard_action_index', index: i})
          send({type: 'scan_wizard_search_index', index: 0})
          send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action', 'action_search']}) 
        }}
      }, `${actionName}: Edit action data`),
      h('div.button', {
        on: { click: e => {
          send({type: 'scan_wizard_action_index', index: i})
          send({type: 'scan_wizard_search_index', index: action.search.length})
          send({type: 'add_scan_search_item', index: i})
          send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_search']}) 
        }}
      }, `${actionName}: Add search item`),
      ...((action.search && action.search.map((search, j) => [
        h('div.button', {
          on: { click: e => {
            send({type: 'scan_wizard_action_index', index: i})
            send({type: 'scan_wizard_search_index', index: j})
            send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_search']}) 
          }}
        }, `${GetSearchName(state, i , j)}: Edit search item`),
        h('div.button', {
          on: {click: e => send({type: 'remove_scan_search_item', index: i, searchIndex: j})}
        }, `${GetSearchName(state, i , j)}: Remove search item`)      
      ]).flat()) || []),
      h('div.button', {
        on: {click: e => send({type: 'remove_scan_action', index: i})}
      }, `${actionName}: Remove action`)

    ]
  }).flat()) || []),
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
import {h} from 'snabbdom/h'

export default (state, send) => [
  !state.scan.json.name ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['display_name']}) }
  }, 'Add a display name') : undefined,
  !state.scan.json.description ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['description']}) }
  }, 'Add a description') : undefined,
  ...((state.scan.json.actions && state.scan.json.actions.filter(action => !action.path).map((action, i) => h(
    'div.button', {
      on: { click: e => {
        send({type: 'scan_wizard_action_index', index: i})
        send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action']})
      }}   
    }, 'Set missing action'
  ))) || [])
].filter(task => task)
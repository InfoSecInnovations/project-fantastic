import {h} from 'snabbdom/h'

export default (state, send) => [
  !state.scan.json.name ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['display_name']}) }
  }, 'Add a display name') : undefined,
  !state.scan.json.description ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['description']}) }
  }, 'Add a description') : undefined,
].filter(task => task)
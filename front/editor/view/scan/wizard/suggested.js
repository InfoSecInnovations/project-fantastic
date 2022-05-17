import {h} from 'snabbdom/h'

export default (state, send) => [
  !state.scan.json.name ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['display_name']}) }
  }, 'Add a display name') : undefined,
  !state.scan.json.description ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['description']}) }
  }, 'Add a description') : undefined,
  ...((state.scan.json.actions && state.scan.json.actions.map((action, i) => {
    // TODO: check if existing action is valid
    if (action.path) return undefined
    return h(
      'div.button', {
        on: { click: e => {
          send({type: 'scan_wizard_action_index', index: i})
          send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action']})
        }}   
      }, 'Set missing action'
    )
  })) || []),
  ...((state.scan.json.actions && state.scan.json.actions.map((action, i) => {
    if (!action.search) return undefined
    return action.search.map((search, j) => {
      if (search.hasOwnProperty('followup') || search.label) return undefined
      return h(
        'div.button', {
          on: { click: e => {
            send({type: 'scan_wizard_action_index', index: i})
            send({type: 'scan_wizard_search_index', index: j})
            send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_label_search']})
          }}
        }, 'Set missing data item label for action result search' // TODO: display action name
      )
    })
  }).flat()) || [])
].filter(task => task)
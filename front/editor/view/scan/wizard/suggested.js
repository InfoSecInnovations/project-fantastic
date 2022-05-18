import {h} from 'snabbdom/h'
import ModuleFromKey from "../../../util/modulefromkey";
import ItemFromKey from "../../../util/itemfromkey";

const getActionData = (state, index) => {
  const action = state.scan.json.actions[index]
  const module = action && ModuleFromKey(state, action.path)
  const actionName = action && ItemFromKey(action.path)
  return module && actionName && module.actions && module.actions[actionName]
}

const getActionName = (state, index) => {
  const action = state.scan.json.actions[index]
  const module = action && ModuleFromKey(state, action.path)
  const actionName = action && ItemFromKey(action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  return (data && data.name) || actionName || 'invalid action'
}

export default (state, send) => [
  !state.scan.json.name ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['display_name']}) }
  }, 'Add a display name') : undefined,
  !state.scan.json.description ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['description']}) }
  }, 'Add a description') : undefined,
  ...((state.scan.json.actions && state.scan.json.actions.map((action, i) => {
    if (getActionData(state, i)) return undefined
    return h(
      'div.button', {
        on: { click: e => {
          send({type: 'scan_wizard_action_index', index: i})
          send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action']})
        }}   
      }, `${getActionName(state, i)}: Set missing action`
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
        }, `${getActionName(state, i)}: Set missing data item label for action result search`
      )
    })
  }).flat()) || []),
  !state.scan.json.pass.success || !state.scan.json.pass.failure || (typeof state.scan.json.pass.failure == 'object' && !state.scan.json.pass.failure.text) ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['pass']}) }
  }, 'Set scan success and/or failure text'): undefined,
  state.scan.json.quest && !state.scan.json.quest.explanation ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['quest_explanation']}) }
  }, 'Set quest explanation') : undefined
].filter(task => task)
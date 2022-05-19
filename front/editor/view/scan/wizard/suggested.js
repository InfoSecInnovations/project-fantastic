import {h} from 'snabbdom/h'
import ModuleFromKey from "../../../util/modulefromkey";
import ItemFromKey from "../../../util/itemfromkey";
import GetActionName from './getactionname';

const getActionData = (state, index) => {
  const action = state.scan.json.actions[index]
  const module = action && ModuleFromKey(state, action.path)
  const actionName = action && ItemFromKey(action.path)
  return module && actionName && module.actions && module.actions[actionName]
}

export default (state, send) => [
  !state.scan.json.name ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['display_name']}) }
  }, 'Add a display name') : undefined,
  !state.scan.json.description ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['description']}) }
  }, 'Add a description') : undefined,
  ...((state.scan.json.actions && state.scan.json.actions.map((action, i) => [
    // detect invalid action on top level element
    !getActionData(state, i) ? h(
      'div.button', {
        on: { click: e => {
          send({type: 'scan_wizard_action_index', index: i})
          send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action']})
        }}   
      }, `${GetActionName(state, i)}: Set missing action`
    ) : undefined,
    ...(action.search && action.search.map((search, j) => [
      // detect missing label on search element
      !search.hasOwnProperty('followup') && !search.label ? h(
        'div.button', {
          on: { click: e => {
            send({type: 'scan_wizard_action_index', index: i})
            send({type: 'scan_wizard_search_index', index: j})
            send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_label_search']})
          }}
        }, `${GetActionName(state, i)}: Set missing data item label for action result search`
      ) : undefined,
      // detect problems with followup search elements
      (() => {
        if (!search.hasOwnProperty('followup')) return undefined
        const module = ModuleFromKey(state, action.path)
        const actionName = ItemFromKey(action.path)
        const data = module && actionName && module.actions && module.actions[actionName]
        const followups = data && data.functions && data.functions.run && data.functions.run.result && data.functions.run.result.followups
        if (followups && followups.length) {
          if (followups.find(followup => followup.function == search.followup)) return undefined
          // detect valid followup but invalid seach data
          return h(
            'div.button', {
              on: { click: e => {
                send({type: 'scan_wizard_action_index', index: i})
                send({type: 'scan_wizard_search_index', index: j})
                // if we don't set this here the dropdown will show something that doesn't match the reality of the data
                send({type: 'set_scan_search_item_followup', index: i, searchIndex: j, value: followups[0].function})
                send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_followup_search']})
              }}
            }, `${GetActionName(state, i)}: Fix invalid or missing followup search data`
          )
        }
        // detect invalid followup
        return h(
          'div.button', {
            on: { click: e => {
              send({type: 'scan_wizard_action_index', index: i})
              send({type: 'scan_wizard_search_index', index: j})
              send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_search']})
            }}
          }, `${GetActionName(state, i)}: Fix invalid action to generate followup data`
        )
      })()
    ]).flat() || [])
  ]).flat()) || []),
  !state.scan.json.pass.success || !state.scan.json.pass.failure || (typeof state.scan.json.pass.failure == 'object' && !state.scan.json.pass.failure.text) ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['pass']}) }
  }, 'Set scan success and/or failure text'): undefined,
  state.scan.json.quest && !state.scan.json.quest.explanation ? h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['quest_explanation']}) }
  }, 'Set quest explanation') : undefined
].filter(task => task)
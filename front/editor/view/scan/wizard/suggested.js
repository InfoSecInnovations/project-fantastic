import {h} from 'snabbdom/h'
import ModuleFromKey from "../../../util/modulefromkey";
import ItemFromKey from "../../../util/itemfromkey";
import GetActionName from './getactionname';
import IsValidFollowupAction from './isvalidfollowupaction';
import IsValidFollowupData from './isvalidfollowupdata';
import GetSearchName from './getsearchname';

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
        }, `${GetSearchName(state, i, j)}: Set missing data item label for action result search`
      ) : undefined,
      // detect problems with followup search elements
      (() => {
        if (!search.hasOwnProperty('followup')) return undefined
        if (!IsValidFollowupAction(state, i)) return h(
          'div.button', {
            on: { click: e => {
              send({type: 'scan_wizard_action_index', index: i})
              send({type: 'scan_wizard_search_index', index: j})
              send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['add_action', 'action_search'], mandatory: true})
              send({type: 'next_wizard', itemType: 'scan'}) // we want to load in the action search task, but have the ability to go back to add action
            }}
          }, `${GetSearchName(state, i, j)}: Fix invalid action to generate followup data`
        )
        if (!IsValidFollowupData(state, i, j)) return h(
          'div.button', {
            on: { click: e => {
              send({type: 'scan_wizard_action_index', index: i})
              send({type: 'scan_wizard_search_index', index: j})
              // if we don't set this here the dropdown will show something that doesn't match the reality of the data
              send({type: 'set_scan_search_item_followup', index: i, searchIndex: j, value: followups[0].function})
              send({type: 'set_wizard_tasks', itemType: 'scan', tasks: ['action_followup_search']})
            }}
          }, `${GetSearchName(state, i, j)}: Fix invalid or missing followup search data`
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
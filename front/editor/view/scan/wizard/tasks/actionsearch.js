import {h} from 'snabbdom/h'
import ItemFromKey from '../../../../util/itemfromkey'
import ModuleFromKey from '../../../../util/modulefromkey'
const searchModes = [
  'label',
  'followup'
]

export default {
  title: 'Configure Action Result Search',
  description: "Once the action has run on the selected hosts, we'll filter the result data to determine which ones have passed. The label mode will look for an action result with that label, and the followup mode will look for data for a followup action with the enabled property set to the selected state.",
  view: (state, send) => {
    const index = state.scan.wizard.actionIndex
    const searchIndex = state.scan.wizard.searchIndex
    const search = state.scan.json.actions[index].search[searchIndex]
    const searchMode = search.hasOwnProperty('followup') ? 'followup' : 'label'
    return h('div.row', [
      h('label.label', { attrs: { for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-mode` }}, 'Search Mode'),
      h('select', { 
        attrs: { id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-mode` },
        on: { input: e => send({type: 'scan_search_item_mode', index, searchIndex, value: e.target.value})}
      }, searchModes.map(mode => h('option', {attrs: {value: mode, selected: searchMode == mode}}, mode)))
    ])
  },
  nextTasks: state => {
    const index = state.scan.wizard.actionIndex
    const searchIndex = state.scan.wizard.searchIndex
    const search = state.scan.json.actions[index].search[searchIndex]
    const searchMode = search.hasOwnProperty('followup') ? 'followup' : 'label'
    return searchMode == 'followup' ? ['action_followup_search', state.scan.wizard.initialRun ? 'pass' : undefined] : ['action_label_search', 'enable_action_result_filtering']
  },
  errors: state => {
    const index = state.scan.wizard.actionIndex
    const searchIndex = state.scan.wizard.searchIndex
    const action = state.scan.json.actions[index]
    const search = action.search[searchIndex]
    const searchMode = search.hasOwnProperty('followup') ? 'followup' : 'label'
    if (searchMode == 'followup') {
      const module = ModuleFromKey(state, action.path)
      const actionName = ItemFromKey(action.path)
      const data = module && actionName && module.actions && module.actions[actionName]
      const followups = data && data.functions && data.functions.run && data.functions.run.result && data.functions.run.result.followups
      if (!followups || !followups.length) return ["The selected action is either invalid or does not have any followups, please switch to label mode or select a different action in the previous task."]
    }
  }
}
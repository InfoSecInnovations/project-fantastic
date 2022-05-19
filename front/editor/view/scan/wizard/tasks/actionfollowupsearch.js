import ItemFromKey from '../../../../util/itemfromkey'
import ModuleFromKey from '../../../../util/modulefromkey'
import FollowupSearchElement from '../../elements/actions/followupsearchelement'

export default {
  title: 'Configure Action Followup Search',
  description: 'Some actions return result data indicating a followup action to perform, with data to pass into the followup. Followup data has a special field called "enabled" that indicates whether an element is considered to be enabled or disabled and adds a button to toggle this status. You can also use this enabled status to filter the hosts being scanned.',
  view: (state, send) => FollowupSearchElement(state, send, state.scan.wizard.actionIndex, state.scan.wizard.searchIndex),
  errors: state => {
    const action = state.scan.json.actions[state.scan.wizard.actionIndex]
    const module = ModuleFromKey(state, action.path)
    const actionName = ItemFromKey(action.path)
    const data = module && actionName && module.actions && module.actions[actionName]
    const followups = data && data.functions && data.functions.run && data.functions.run.result && data.functions.run.result.followups
    if (!followups || !followups.length) return ["The selected action doesn't have followups or is invalid, please go back and select a valid action with followups or change the result search mode to label."]
    const search = action.search[state.scan.wizard.searchIndex]
    if (!followups.find(followup => followup.function == search.followup)) return ["The selected followup doesn't exist, please select one from the dropdown."]
  }
}
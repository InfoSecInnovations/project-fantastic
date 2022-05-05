import {h} from 'snabbdom/h'
import WizardView from '../../common/wizardview'
import ActionFollowupSearch from './tasks/actionfollowupsearch'
import ActionLabelSearch from './tasks/actionlabelsearch'
import ActionResultFiltering from './tasks/actionresultfiltering'
import ActionSearch from './tasks/actionsearch'
import AddAction from './tasks/addaction'
import Description from './tasks/description'
import DisplayName from './tasks/displayname'
import EnableActionResultFiltering from './tasks/enableactionresultfiltering'
import EnableFailureFollowup from './tasks/enablefailurefollowup'
import FailureFollowupData from './tasks/failurefollowupdata'
import Hosts from './tasks/hosts'
import Parameters from './tasks/parameters'
import Pass from './tasks/pass'
import Role from './tasks/role'
import SelectFailureAction from './tasks/selectfailureaction'

const getWizard = (state, send) => {
  const task = state.scan.wizard.tasks[state.scan.wizard.index || 0]
  if (task == 'display_name') return DisplayName
  if (task == 'description') return Description
  if (task == 'hosts') return Hosts
  if (task == 'role') return Role
  if (task == 'parameters') return Parameters
  if (task == 'add_action') return AddAction
  if (task == 'action_search') return ActionSearch
  if (task == 'action_followup_search') return ActionFollowupSearch
  if (task == 'action_label_search') return ActionLabelSearch
  if (task == 'action_result_filtering') return ActionResultFiltering
  if (task == 'enable_action_result_filtering') return EnableActionResultFiltering
  if (task == 'pass') return Pass
  if (task == 'enable_failure_followup') return EnableFailureFollowup
  if (task == 'select_failure_action') return SelectFailureAction
  if (task == 'failure_followup_data') return FailureFollowupData
  return {title: 'Not implemented', description: `${task} wizard task has not been implemented yet!`}
}

export default (state, send) => {
  if (state.scan.wizard.tasks.length) return WizardView(state, send, getWizard(state, send), 'scan') 
}
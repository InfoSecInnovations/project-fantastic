import {h} from 'snabbdom/h'
import Available from './available'
import Suggested from './suggested'
import ConvertToJSON from './tasks/converttojson'
import Description from './tasks/description'
import DisplayName from './tasks/displayname'
import EditRun from './tasks/editrun'
import FollowupActions from './tasks/followupactions'
import FunctionNames from './tasks/functionnames'
import Hosts from './tasks/hosts'
import Inputs from './tasks/inputs'
import InvocationMethod from './tasks/invocationmethod'
import PSCommand from './tasks/pscommand'
import ResultData from './tasks/resultdata'
import ResultLabel from './tasks/resultlabel'
import ResultProcessing from './tasks/resultprocessing'
import Role from './tasks/role'
import TargetType from './tasks/targettype'
import WizardView from '../../common/wizardview'

const getWizard = (state, send) => {
  const task = state.action.wizard.tasks[state.action.wizard.index || 0]
  if (task == 'display_name') return DisplayName
  if (task == 'description') return Description
  if (task == 'hosts') return Hosts
  if (task == 'role') return Role
  if (task == 'edit_run_function') return EditRun
  if (task == 'powershell_command') return PSCommand
  if (task == 'invocation_method') return InvocationMethod
  if (task == 'inputs') return Inputs
  if (task == 'result_processing') return ResultProcessing
  if (task == 'convert_to_json') return ConvertToJSON
  if (task == 'result_label') return ResultLabel
  if (task == 'add_data_items') return ResultData
  if (task == 'function_names') return FunctionNames
  if (task == 'target_type') return TargetType
  if (task == 'followup_actions') return FollowupActions
  return {title: 'Not implemented', description: `${task} wizard task has not been implemented yet!`}
}

export default (state, send) => {
  if (state.action.wizard.tasks.length) return WizardView(state, send, getWizard(state, send), 'action') 
  const suggested = Suggested(state, send)
  return h('div.wizard editor-scroll', [
    suggested.length ? h('div.tasklist', [
      h('h3', 'Suggested Tasks'),
      ...suggested
    ]) : h('div', 'The basic elements of this action appear to be set up. Use the wizards below to configure existing data or add new items, or switch to advanced or JSON mode for an overview.'),
    h('div.tasklist', [
      h('h3', 'Available Wizards'),
      ...Available(state, send)
    ])
  ])
}
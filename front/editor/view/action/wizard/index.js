import {h} from 'snabbdom/h'
import Available from './available'
import Suggested from './suggested'
import ConvertToJSON from './tasks/converttojson'
import Description from './tasks/description'
import DisplayName from './tasks/displayname'
import EditRun from './tasks/editrun'
import FunctionNames from './tasks/functionnames'
import Hosts from './tasks/hosts'
import Inputs from './tasks/inputs'
import InvocationMethod from './tasks/invocationmethod'
import PSCommand from './tasks/pscommand'
import ResultData from './tasks/resultdata'
import ResultLabel from './tasks/resultlabel'
import ResultProcessing from './tasks/resultprocessing'
import Role from './tasks/role'
import WizardView from './wizardview'

const getWizard = (state, send) => {
  const task = state.action.wizard.tasks[state.action.wizard.index || 0]
  if (task == 'display_name') return DisplayName(state, send)
  if (task == 'description') return Description(state, send)
  if (task == 'hosts') return Hosts(state, send)
  if (task == 'role') return Role(state, send)
  if (task == 'edit_run_function') return EditRun(state, send)
  if (task == 'powershell_command') return PSCommand(state, send)
  if (task == 'invocation_method') return InvocationMethod(state, send)
  if (task == 'inputs') return Inputs(state, send)
  if (task == 'result_processing') return ResultProcessing(state, send)
  if (task == 'convert_to_json') return ConvertToJSON(state, send)
  if (task == 'result_label') return ResultLabel(state, send)
  if (task == 'add_data_items') return ResultData(state, send)
  if (task == 'function_names') return FunctionNames(state, send)
  return WizardView(state, send, 'Not implemented', `${task} wizard task has not been implemented yet!`)
}

export default (state, send) => {
  if (state.action.wizard.tasks.length) return getWizard(state, send)
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
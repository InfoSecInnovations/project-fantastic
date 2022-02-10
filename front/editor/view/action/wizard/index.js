import {h} from 'snabbdom/h'
import ConvertToJSON from './converttojson'
import Description from './description'
import DisplayName from './displayname'
import EditRun from './editrun'
import Hosts from './hosts'
import Inputs from './inputs'
import InvocationMethod from './invocationmethod'
import PSCommand from './pscommand'
import ResultLabel from './resultlabel'
import ResultProcessing from './resultprocessing'
import Role from './role'
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
  return WizardView(state, send, 'Not implemented', `${task} wizard task has not been implemented yet!`)
}

export default (state, send) => state.action.wizard.tasks.length ? getWizard(state, send) : h('div.wizard', 'TODO: wizard suggestions.')
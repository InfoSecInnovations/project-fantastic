import {h} from 'snabbdom/h'
import ConvertToJSON from './converttojson'
import Description from './description'
import DisplayName from './displayname'
import EditRun from './editrun'
import Hosts from './hosts'
import Inputs from './inputs'
import InvocationMethod from './invocationmethod'
import PSCommand from './pscommand'
import ResultData from './resultdata'
import ResultLabel from './resultlabel'
import ResultProcessing from './resultprocessing'
import Role from './role'
import WizardView from './wizardview'

const followupTasks = [
  'function_names', 
  'powershell_command', 
  'invocation_method', 
  'inputs', 
  'result_processing'
]

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
  return WizardView(state, send, 'Not implemented', `${task} wizard task has not been implemented yet!`)
}

export default (state, send) => {
  if (state.action.wizard.tasks.length) return getWizard(state, send)
  const suggested = [
    !state.action.json.name ? h('div.button', {
      on: { click: e => send({type: 'action_set_wizard_tasks', tasks: ['display_name']}) }
    }, 'Add a display name') : undefined,
    !state.action.json.description ? h('div.button', {
      on: { click: e => send({type: 'action_set_wizard_tasks', tasks: ['description']}) }
    }, 'Add a description') : undefined,
  ].filter(task => task)
  return h('div.wizard', [
    suggested.length ? h('div.tasklist', [
      h('h3', 'Suggested Tasks'),
      ...suggested
    ]) : undefined,
    h('div.tasklist', [
      h('h3', 'Available Wizards'),
      h('div.button', {
        on: { click: e => send({type: 'action_set_wizard_tasks', tasks: ['display_name', 'description', 'hosts', 'role']}) }
      }, 'Edit basic info'),
      h('div.button', {
        on: {
          click: e => {
            send({type: 'add_action_followup'})
            send({type: 'action_wizard_load_function', funcName: Object.keys(state.action.json.functions).filter(name => name != 'run').at(-1)})
            send({type: 'action_set_wizard_tasks', tasks: followupTasks})
          }
        }
      }, 'Create a followup function'),
      h('div.button', {
        on: {
          click: e => {
            send({type: 'action_wizard_load_function', funcName: 'run'})
            send({type: 'action_set_wizard_tasks', tasks: ['powershell_command', 'invocation_method', 'inputs', 'result_processing']})
          }
        }
      }, 'Edit run function (entry point)'),
      ...Object.entries(state.action.json.functions).filter(([name, data]) => name != 'run').map(([name, data]) => h('div.button', {
        on: {
          click: e => {
            send({type: 'action_wizard_load_function', funcName: name})
            send({type: 'action_set_wizard_tasks', tasks: followupTasks})
          }
        }
      }, `Edit ${data.name || name} function`))
    ])
  ])
}
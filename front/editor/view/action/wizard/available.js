import {h} from 'snabbdom/h'
import actionWizardBaseTasks from '../../../defaults/actionWizardBaseTasks'

const baseFunctionTasks = [
  'powershell_command', 
  'invocation_method', 
  'inputs', 
  'result_processing'
]

const followupTasks = [
  'function_names', 
  ...baseFunctionTasks
]

export default (state, send) => [
  h('div.button', {
    on: { click: e => send({type: 'action_set_wizard_tasks', tasks: actionWizardBaseTasks}) }
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
        send({type: 'action_set_wizard_tasks', tasks: baseFunctionTasks})
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
]
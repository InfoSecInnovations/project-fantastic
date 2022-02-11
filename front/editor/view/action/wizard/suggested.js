import {h} from 'snabbdom/h'

export default (state, send) => [
  ...Object.entries(state.action.json.functions).filter(([name, data]) => !data.command).map(([name, data]) => h('div.button', {
    on: {
      click: e => {
        send({type: 'action_wizard_load_function', funcName: name})
        send({type: 'action_set_wizard_tasks', tasks: ['powershell_command']})
      }
    }
  }, `Set a PowerShell command for ${data.name || name} function`)),
  !state.action.json.name ? h('div.button', {
    on: { click: e => send({type: 'action_set_wizard_tasks', tasks: ['display_name']}) }
  }, 'Add a display name') : undefined,
  !state.action.json.description ? h('div.button', {
    on: { click: e => send({type: 'action_set_wizard_tasks', tasks: ['description']}) }
  }, 'Add a description') : undefined,
].filter(task => task)
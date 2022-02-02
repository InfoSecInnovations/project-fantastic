import {h} from 'snabbdom/h'
import Description from './description'
import DisplayName from './displayname'
import EditRun from './editrun'
import Hosts from './hosts'
import Role from './role'
import WizardView from './wizardview'

const getWizard = (state, send) => {
  const task = state.action.wizard.tasks[state.action.wizard.index || 0]
  if (task == 'display_name') return DisplayName(state, send)
  if (task == 'description') return Description(state, send)
  if (task == 'hosts') return Hosts(state, send)
  if (task == 'role') return Role(state, send)
  if (task == 'edit_run_function') return EditRun(state, send)
  return WizardView(state, send, 'Not implemented', `${task} wizard task has not been implemented yet!`)
}

export default (state, send) => h('div#action-editor.panel', state.action.wizard.tasks.length ? getWizard(state, send) : h('div', 'TODO: wizard suggestions.'))
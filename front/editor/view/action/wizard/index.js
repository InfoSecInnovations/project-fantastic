import {h} from 'snabbdom/h'
import Description from './description'
import DisplayName from './displayname'
import WizardView from './wizardview'

const getWizard = (state, send) => {
  const task = state.action.wizard.tasks[state.action.wizard.index || 0]
  if (task == 'display_name') return DisplayName(state, send)
  if (task == 'description') return Description(state, send)
  return WizardView(state, send, 'Not implemented', `${task} wizard task has not been implemented yet!`)
}

export default (state, send) => h('div#action-editor.panel', state.action.wizard.tasks.length ? getWizard(state, send) : h('div', 'TODO: wizard suggestions.'))
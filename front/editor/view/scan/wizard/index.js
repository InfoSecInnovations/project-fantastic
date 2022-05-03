import {h} from 'snabbdom/h'
import WizardView from '../../common/wizardview'
import AddAction from './tasks/addaction'
import Description from './tasks/description'
import DisplayName from './tasks/displayname'
import Hosts from './tasks/hosts'
import Parameters from './tasks/parameters'
import Role from './tasks/role'

const getWizard = (state, send) => {
  const task = state.scan.wizard.tasks[state.scan.wizard.index || 0]
  if (task == 'display_name') return DisplayName
  if (task == 'description') return Description
  if (task == 'hosts') return Hosts
  if (task == 'role') return Role
  if (task == 'parameters') return Parameters
  if (task == 'add_action') return AddAction
  // TODO: tasks
  return {title: 'Not implemented', description: `${task} wizard task has not been implemented yet!`}
}

export default (state, send) => {
  if (state.scan.wizard.tasks.length) return WizardView(state, send, getWizard(state, send), 'scan') 
}
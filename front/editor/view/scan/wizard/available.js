import {h} from 'snabbdom/h'
import scanWizardBaseTasks from '../../../defaults/scanWizardBaseTasks'

export default (state, send) => [
  h('div.button', {
    on: { click: e => send({type: 'set_wizard_tasks', itemType: 'scan', tasks: scanWizardBaseTasks}) }
  }, 'Edit basic info'),
]
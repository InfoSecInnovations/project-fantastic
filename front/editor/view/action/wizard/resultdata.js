import Data from '../elements/data'
import WizardView from './wizardview'

export default (state, send) => WizardView(
  state, 
  send, 
  'Configure result data', 
  "In this section you can add additional data from the command output to be displayed to the user. This follows the exact same format as the previous label item. You can leave this section empty if desired.",
  Data(
    state,
    send,
    undefined,
    state.action.wizard.funcName,
    undefined, // TODO result array support
    `${state.action.filename}-${state.action.wizard.funcName}`,
    [] // TODO result array support
  )
)
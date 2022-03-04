import Data from '../../elements/data'

export default {
  title: 'Configure result data',
  description: "In this section you can add additional data from the command output to be displayed to the user. This follows the exact same format as the previous label item. You can leave this section empty if desired.",
  view: (state, send) =>  Data(
    state,
    send,
    undefined,
    state.action.wizard.funcName,
    `${state.action.filename}-${state.action.wizard.funcName}`
  ),
  scope: 'function'
}
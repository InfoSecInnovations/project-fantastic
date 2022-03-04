import FollowupData from '../../elements/followupdata'

export default {
  title: 'Configure followup actions',
  description: [
    "In this section you can specify functions the user can run building on the output of the function currently being edited. You can leave this section empty if desired.",
    "The variables you set up here will get their values from the command output the same way the other result data does, and will be passed into the chosen followup function as input variables."
  ],
  view: (state, send) => FollowupData(
    state,
    send,
    state.action.wizard.funcName
  ),
  scope: 'function'
}
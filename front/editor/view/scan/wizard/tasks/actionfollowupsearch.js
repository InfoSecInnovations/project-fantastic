import FollowupSearchElement from '../../elements/actions/followupsearchelement'

export default {
  title: 'Configure Action Followup Search',
  description: 'Some actions return result data indicating a followup action to perform, with data to pass into the followup. Followup data has a special field called "enabled" that indicates whether an element is considered to be enabled or disabled and adds a button to toggle this status. You can also use this enabled status to filter the hosts being scanned.',
  view: (state, send) => FollowupSearchElement(state, send, state.scan.wizard.actionIndex, state.scan.wizard.searchIndex)
}
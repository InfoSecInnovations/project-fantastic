import FollowupData from '../../elements/pass/followupdata'

export default {
  title: 'Configure Followup Action Data',
  description: 'Here you can configure the data object that will be passed into the chosen followup action',
  view: (state, send) => FollowupData(state, send)
}
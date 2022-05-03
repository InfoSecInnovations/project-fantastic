import Parameters from '../../elements/parameters'

export default {
  title: 'Add Parameters',
  description: "You can add user configurable parameters here to be passed into the filtering expression. You can leave this empty if you don't want any user configurable parameters with this scan.",
  view: (state, send) => Parameters(state, send),
}
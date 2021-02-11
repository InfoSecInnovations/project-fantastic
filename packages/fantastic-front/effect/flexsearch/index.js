import InitFlex from './initflex'

export default (state, action, send) => {
  if (action.type == 'actions') InitFlex(state, send, action.actions, 'actions')
  if (action.type == 'scans') InitFlex(state, send, action.scans, 'scans')
  if (action.type == 'commands') InitFlex(state, send, action.commands, 'commands')
  if (action.type == 'search_input') {
    const results = state.flex_search[action.search_type].index.search(action.query)
    send({type: 'search_results', results, search_type: action.search_type})
  }
}
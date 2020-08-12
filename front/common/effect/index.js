import ActionFollowup from './actionfollowup'
import GenerateQuery from './generatequery'
const FlexSearch = require('flexsearch')

export default (state, action, send) => {
  if (action.type == 'perform_action') fetch(`/actions?${GenerateQuery({action: action.action, node_id: action.node_id})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date}))
  if (action.type == 'actions') {
    const index = new FlexSearch()
    Object.entries(action.actions).forEach(v => index.add(v[0], v[1].name))
    send({type: 'search_index', index, search_type: 'actions'})
  }
  if (action.type == 'action_followup') ActionFollowup(state, action, send)
  if (action.type == 'search_input') {
    const results = state.flex_search[action.search_type].index.search(action.query)
    send({type: 'search_results', results, search_type: action.search_type})
  }
}
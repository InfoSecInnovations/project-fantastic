import ActionFollowup from './actionfollowup'
import GenerateQuery from './generatequery'
const FlexSearch = require('flexsearch')

export default (state, action, send) => {
  if (action.type == 'perform_action') fetch(`/actions?${GenerateQuery({action: action.action, node_id: action.node_id})}`, {method: 'POST'})
    .then(res => res.json())
    .then(res => send({...action, type: 'action_result', result: res.result, hostname: action.host, date: res.date}))
  if (action.type == 'actions') {
    const search = new FlexSearch()
    Object.entries(action.actions).forEach(v => search.add(v[0], v[1].name))
    send({type: 'flex_search', search})
  }
  if (action.type == 'action_followup') ActionFollowup(state, action, send)
  if (action.type == 'action_search') {
    const results = state.flex_search.search(action.query)
    send({type: 'search_results', results})
  }
}
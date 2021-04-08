import Common from '@infosecinnovations/fantastic-front/effect'
import LoadNodeResults from '@infosecinnovations/fantastic-front/effect/loadnoderesults'
import FetchScripts from '@infosecinnovations/fantastic-front/effect/fetchscripts'
import FlexSearch from '@infosecinnovations/fantastic-front/effect/flexsearch'

const parent_actions = [
  'toggle_favorite',
  'action_result',
  'action_followup_result'
]

export default (state, action, send) => {
  Common(state, action, send)
  FlexSearch(state, action, send)
  if (action.type == 'init') {
    fetch('/favorites')
    .then(res => res.json())
    .then(res => res.forEach(v => send({type: 'toggle_favorite', data_key: v.data_key, data_type: v.data_type})))
    FetchScripts(send, 'actions')
  } 
  if (action.type == 'node_data') LoadNodeResults([action.data], send)
  if (parent_actions.includes(action.type) && !action.from_other && state.parent_tab) state.parent_tab.send(action)
}
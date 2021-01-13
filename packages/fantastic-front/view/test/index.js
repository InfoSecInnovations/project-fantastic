import {h} from 'snabbdom/h'
import TimeAgo from '../../util/timeago'
import Result from './result'
import Info from './info'
import PlayButton from './playbutton'

export default (state, send, name, data, parameters, result_data, result_date, result_parameters, result_approval, loading, play_action, options = {}) => {
  const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
  const pass = results && (data.pass === 'review' ? result_approval : results.every(r => r.result == data.pass.condition))
  const failed_results = results && data.pass !== 'review' ? results.filter(r => r.result != data.pass.condition) : []
  const failed_nodes = failed_results.map(v => state.nodes.findIndex(n => n.node_id === v.node_id))
  const valid_parameters = !parameters || Object.values(parameters.get()).every(v => (typeof v === 'number' && !isNaN(v) && isFinite(v)) || typeof v === 'boolean' || v)
  const status = results && pass ? 'success' : results && !pass ? 'failure' : 'pending'
  return h('div.scroll_item spaced', [
    ...Info(state, data, parameters && parameters.get(), status),
    ...PlayButton(
      loading ? 'loading' : valid_parameters ? {on: {click: [send, play_action]}} : {class: {waiting: true}}, 
      parameters && parameters.edit && parameters.edit()
    ),
    // TODO: make this block into its own file
    ...(results ?
    [
      h('h4', `Results from ${TimeAgo(result_date)}`),
      parameters && parameters.result && parameters.result(),
      // TODO: is_quest looks like a bool here, but the expected parameter is a string?
      Result(send, name, data, pass, options, result_parameters, failed_nodes, results, options && options.is_quest)
    ] : [])
  ])
}
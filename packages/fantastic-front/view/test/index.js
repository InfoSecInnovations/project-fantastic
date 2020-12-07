import {h} from 'snabbdom/h'
import HostString from '../../util/hoststring'
import TimeAgo from '../../util/timeago'
import Result from './result'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')

export default (state, send, name, data, parameters, result_data, result_date, result_parameters, result_approval, loading, play_action, options = {}) => {
  const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
  const pass = results && (data.pass === 'review' ? result_approval : results.every(r => r.result == data.pass.condition))
  const failed_results = results && data.pass !== 'review' ? results.filter(r => r.result != data.pass.condition) : []
  const failed_nodes = failed_results.map(v => state.nodes.findIndex(n => n.node_id === v.node_id))
  const valid_parameters = !parameters || Object.values(parameters.get()).every(v => (typeof v === 'number' && !isNaN(v) && isFinite(v)) || typeof v === 'boolean' || v)
  let icon = 'exclamation-circle'
  if (results) icon = pass ? 'check-circle' : 'times-circle'
  return h('div.scroll_item spaced', [
    h('div.item', [
      h('h3', data.name),
      h(`span.fas fa-${icon} fa-fw`, {class: {success: results && pass, failure: results && !pass, pending: !results}}),
    ]),
    data.description ? h('div.item', FormatString(data.description, parameters && parameters.get())) : undefined,
    h('div', [
      'Uses Actions:',
      h('ul', data.actions.map(v => h('li', state.actions[v].name)))
    ]),
    h('div.targets', [h('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`]),
    ...(loading ?
    [h('div.play button disabled', 'Gathering results...')] :
    [
      parameters && parameters.edit && parameters.edit(),
      h('div.play button', valid_parameters ? {on: {click: [send, play_action]}} : {class: {waiting: true}}, [
        'Start',
        h('span.fas fa-play')
      ])
    ]),
    ...(results ?
    [
      h('h4', `Results from ${TimeAgo(result_date)}`),
      parameters && parameters.result && parameters.result(),
      Result(send, name, data, pass, options, result_parameters, failed_nodes, results, options && options.is_quest)
    ] : [])
  ])
}
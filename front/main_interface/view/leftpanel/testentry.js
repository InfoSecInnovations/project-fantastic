import {h} from 'snabbdom/h'
import HostString from '../../../common/util/hoststring'
import TimeAgo from '../../../common/util/timeago'
const FormatString = require('fantastic-utils/formatstring')

const result = (send, data, pass, options, result_parameters, failed_nodes, results) => {
  if (data.pass === 'review') return h('div.button', {on: {click: [send, {type: 'review', results, name: data.name}]}}, 'See results')
  if (pass) return h('div', `${options.success_prefix ? `${options.success_prefix} ` : ''}${FormatString(data.pass.success, result_parameters)}`)
  return h('div.link', 
    {
      on: {click: [
        [send, {type: 'vis_select', nodes: failed_nodes}],
        [send, {type: 'select', nodes: failed_nodes}]
      ]}
    }, 
    `${failed_results.length} systems ${FormatString(data.pass.failure, result_parameters)}`
  )
}

export default (state, send, data, parameters, result_data, result_date, result_parameters, loading, play_action, options = {}) => {
  const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
  const pass = results && (data.pass === 'review' ? results : results.every(r => r.result == data.pass.condition))
  const failed_results = results && data.pass !== 'review' ? result_data.filter(r => r.result != data.pass.condition) : []
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
      result(send, data, pass, options, result_parameters, failed_nodes, results)
    ] : [])
  ])
}
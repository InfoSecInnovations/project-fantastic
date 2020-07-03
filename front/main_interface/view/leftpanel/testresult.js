const H = require('snabbdom/h').default
const HostString = require('../../../common/util/hoststring')
const TimeAgo = require('../../../common/util/timeago')
const FormatString = require('fantastic-utils/formatstring')

const testResult = (state, send, data, parameters, result_data, result_date, result_parameters, loading, play_action, options = {}) => {
  const results = result_date > Date.now() - 1000 * 60 * 60 * 24 && result_data // TODO: maybe we want to be able to define a custom maximum result age
  const pass = results && results.every(r => r.result == data.pass.condition)
  const failed_results = results ? result_data.filter(r => r.result != data.pass.condition) : []
  const failed_nodes = failed_results.map(v => state.nodes.findIndex(n => n.node_id === v.node_id))
  let icon = 'exclamation-circle'
  if (results) icon = pass ? 'check-circle' : 'times-circle'
  return H('div.scroll_item', [
    H('div.item', [
      H('div.subtitle', data.name),
      H(`span.fas fa-${icon} fa-fw`, {class: {success: results && pass, failure: results && !pass, pending: !results}}),
    ]),
    data.description ? H('div.item', FormatString(data.description, parameters.get())) : undefined,
    H('div.targets', [H('b', 'Valid targets:'), ` ${data.hosts.map(HostString).join(', ')}.`]),
    ...(loading ?
    [H('div.play waiting', [
      H('div.item', 'Gathering results...')
    ])] :
    [
      parameters.edit && parameters.edit(),
      H('div.play', {on: {click: [send, play_action]}}, [
        H('div.item', 'Start'),
        H('span.fas fa-play fa-fw play_button')
      ])
    ]),
    ...(results ?
    [
      H('div.subsubtitle', `Results from ${TimeAgo(result_date)}`),
      parameters.result && parameters.result(),
      H('div.item', `${results.length} systems scanned`),
      pass ?
      H('div.item', `${options.success_prefix ? `${options.success_prefix} ` : ''}${FormatString(data.pass.success, result_parameters)}`) :
      H('a.item', 
      {
        on: {click: [
          [send, {type: 'vis_select', nodes: failed_nodes}],
          [send, {type: 'select', nodes: failed_nodes}]
        ]}
      }, 
      `${failed_results.length} systems ${FormatString(data.pass.failure, result_parameters)}`)
    ] : [])
  ])
}

module.exports = testResult
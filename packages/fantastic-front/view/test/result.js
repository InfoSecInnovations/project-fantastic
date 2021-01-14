import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import TimeAgo from '../../util/timeago'

const result = (send, name, data, pass, success_prefix, result_parameters, failed_nodes, results, type) => {
  if (data.pass === 'review') return h('div.button', {on: {click: [send, {type: 'review', results, name, data_type: type}]}}, 'See results')
  if (pass) return h('div', `${success_prefix ? `${success_prefix} ` : ''}${FormatString(data.pass.success, result_parameters)}`)
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

export default (send, result_info, name, data, date, pass, success_prefix, result_parameters, failed_nodes, results, type) => {
  return [
    h('h4', `Results from ${TimeAgo(date)}`),
    result_info,
    // TODO: is_quest looks like a bool here, but the expected parameter is a string?
    result(send, name, data, pass, success_prefix, result_parameters, failed_nodes, results, type)
  ]
}
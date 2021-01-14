import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import TimeAgo from '../../util/timeago'

const result = (send, {review_type, review_name, review_node = undefined}, data, pass, success_prefix, result_parameters, failed_nodes, results) => {
  if (data.pass === 'review') return h('div.button', {on: {click: [send, {type: 'review', results, name: review_name, data_type: review_type, story_node: review_node}]}}, 'See results')
  if (pass) return h('div', `${success_prefix ? `${success_prefix} ` : ''}${FormatString(data.pass.success, result_parameters)}`)
  return h('div.link', 
    {
      on: {click: [
        [send, {type: 'vis_select', nodes: failed_nodes}],
        [send, {type: 'select', nodes: failed_nodes}]
      ]}
    }, 
    `${failed_nodes.length} systems ${FormatString(data.pass.failure, result_parameters)}`
  )
}

export default (send, result_info, review_info, data, date, pass, success_prefix, result_parameters, failed_nodes, results) => {
  return [
    h('h4', `Results from ${TimeAgo(date)}`),
    result_info,
    result(send, review_info, data, pass, success_prefix, result_parameters, failed_nodes, results)
  ]
}
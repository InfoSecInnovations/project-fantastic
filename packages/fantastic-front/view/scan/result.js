import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
import TimeAgo from '../../util/timeago'
import SaveButton from '../savebutton'

const result = (send, data, pass, result_parameters, failed_nodes, {review_type, review_name, review_results, review_node, success_prefix, scan_id}) => {
  if (data.pass === 'review') return h('div.button', {on: {click: e => send({type: 'review', results: review_results, data_key: review_name, data_type: review_type, story_node: review_node})}}, 'See results')
  if (pass) return h('div', `${success_prefix ? `${success_prefix} ` : ''}${FormatString(data.pass.success, result_parameters)}`)
  return h('div.link', 
    {
      on: {click: e => {
        send({type: 'vis_select', nodes: failed_nodes})
        send({type: 'select', nodes: failed_nodes})
        send({type: 'select_story', story: null})
        if (data.pass.failure.action) {
          send({type: 'scan_resolve',  scan: data.key, scan_id})
        }
      }}
    }, 
    `${failed_nodes.length} systems ${FormatString(typeof data.pass.failure == "string" ? data.pass.failure : data.pass.failure.text, result_parameters)}`
  )
}

export default (state, send, data, date, pass, result_parameters, failed_nodes, {history_item, event_type, review_name, result_data, review_node = undefined, success_prefix = '', result_info = undefined, scan_id = undefined}) => {
  return [
    h('h4', `Results from ${TimeAgo(date)}`),
    result_info,
    result(send, data, pass, result_parameters, failed_nodes, {review_type: event_type, review_name, review_results: result_data, review_node, success_prefix, scan_id}),
    SaveButton(state, send, history_item, true)
  ].flat()
}
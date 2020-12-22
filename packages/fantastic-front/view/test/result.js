import {h} from 'snabbdom/h'
const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')

export default (send, name, data, pass, options, result_parameters, failed_nodes, results, type) => {
  if (data.pass === 'review') return h('div.button', {on: {click: [send, {type: 'review', results, name, data_type: type}]}}, 'See results')
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
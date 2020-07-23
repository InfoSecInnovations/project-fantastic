const H = require('snabbdom/h').default
const TimeAgo = require('../../util/timeago')
const FormatString = require('fantastic-utils/formatstring')

const format_value = value => {
  if (typeof value === 'object') {
    if (value.date) return TimeAgo(value.date)
  }
  return `${value}`
}

const result = (state, action, action_result, index, node_id, host, loading, send, followups = []) => H('div.result', [
  action_result.label ? H('div.result_header', action_result.label) : undefined,
  ...(action_result.data ? action_result.data.map(v => H('div.item', format_value(v))) : []),
  ...(action_result.followups ? Object.values(action_result.followups).map(v => {
    const followup_label = v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enabled' : 'Disabled')) || state.actions[action].names[v.function]
    if (v.not_permitted) return H('div.item', followup_label)
    const loading_followup = loading || v.status === 'loading'
    const disabled = !loading_followup && typeof v.enabled !== 'undefined' && !v.enabled
    return H('div.followup_command', [
      H('div.item', H(
        'div.button', 
        {
          on: loading_followup ? {} : {
            click: [
              send, 
              {
                type: 'action_followup', 
                action,
                data: v.data,
                node_id,
                host,
                followups: [...followups, {index, followup: v.function, label: action_result.label}],
                refresh: true,
                date: Date.now()
              }
            ]
          },
          class: {loading: loading_followup, disabled}
        }, 
        (loading_followup && 'Running...') || followup_label
      )),
      H('pre.command', FormatString(state.actions[action].commands[v.function], v.data))//format_command(state.actions[action].commands[v.function], v.data))
    ])
  }) : []),
  ...(action_result.followups ? Object.values(action_result.followups)
  .filter(v => v.result)
  .map(v => {
    return H('div', [
      H('div.result_time', [
        H('div.result_header', v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enable' : 'Disable')) || state.actions[action].names[v.function]),
        H('div.time', [
          ` Results from ${TimeAgo(v.date)}`, 
          H(`div.foldout fas fa-${v.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
            on: {click: [send, {
              type: 'followup_foldout',
              action,
              node_id,
              hostname: host,
              followups: [...followups, {index, followup: v.function, label: action_result.label}],
              value: !v.foldout
            }]}
          })
        ])
      ]),
      ...(v.foldout ? v.result.map((r, i) => 
        result(state, action, r, i, node_id, host, loading || v.status === 'loading', send, [...followups, {index, followup: v.function, label: action_result.label}])
      ) : [])
    ])
  }).flat() : [])
])


module.exports = result
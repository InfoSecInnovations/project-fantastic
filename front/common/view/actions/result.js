const H = require('snabbdom/h').default
const TimeAgo = require('../../util/timeago')
const ResultLabel = require('../../util/resultlabel')

const format_command = (command, data) => {
  Object.entries(data).forEach(v => command = command.split(`$${v[0]}`).join(v[1]))
  return command
}

const result = (state, action, action_result, index, node_id, host, loading, send, followups = []) => H('div.result', [
  action_result.label ? H('div.result_header', action_result.label) : undefined,
  ...(action_result.data ? action_result.data.map(v => H('div.item', v)) : []),
  ...(action_result.followups ? Object.values(action_result.followups).map(v => {
    const followup_label = ResultLabel(v)
    if (v.not_permitted) return H('div.item', followup_label)
    const loading_followup = loading || v.status === 'loading'
    return H('div.followup_command', [
      H('div.item', H(
        'div.button', 
        {
          on: {
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
          class: {loading: loading_followup, disabled: typeof v.enabled !== 'undefined' && !v.enabled}
        }, 
        (loading_followup && 'Running...') || followup_label
      )),
      H('pre.command', format_command(state.actions[action].commands[v.function], v.data))
    ])
  }) : []),
  ...(action_result.followups ? Object.values(action_result.followups)
  .filter(v => v.result)
  .map(v => {
    const followup_label = ResultLabel(v)
    return H('div', [
      H('div.result_time', [
        H('div.result_header', followup_label),
        H('div.time', ` Results from ${TimeAgo(v.date)}`),
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
      ]),
      ...(v.foldout ? v.result.map((r, i) => 
        result(state, action, r, i, node_id, host, loading || v.status === 'loading', send, [...followups, {index, followup: v.function, label: action_result.label}])
      ) : [])
    ])
  }).flat() : [])
])


module.exports = result
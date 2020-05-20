const H = require('snabbdom/h').default
const TimeAgo = require('../../util/timeago')

const result = (action, action_result, index, node_id, host, loading, send, followups = []) => H('div.result', [
  action_result.label ? H('div.result_header', action_result.label) : undefined,
  ...(action_result.data ? action_result.data.map(v => H('div.item', v)) : []),
  ...(action_result.followups ? Object.values(action_result.followups).map(v => {
    if (v.not_permitted) return H('div.item', v.label || (v.enabled ? 'Enabled' : 'Disabled'))
    return H('div.item', [
      H(
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
              followups: [...followups, {index, followup: v.function}],
              refresh: true,
              date: Date.now()
            }
          ]
        }
      }, 
      (loading || v.status === 'loading' && 'Running...') || v.label || (v.enabled ? 'Enabled' : 'Disabled')
    )
    ])
  }) : []),
  ...(action_result.followups ? Object.values(action_result.followups)
  .filter(v => v.result)
  .map(v => 
    H('div', [
      H('div.result_time', [
        H('div.result_header', v.label || (v.enabled ? 'Enable' : 'Disable')),
        H('div.time', ` Results from ${TimeAgo(v.date)}`),
        H(`div.foldout fas fa-${v.foldout ? 'chevron-down' : 'chevron-right'} fa-fw`, {
          on: {click: [send, {
            type: 'followup_foldout',
            action,
            node_id,
            hostname: host,
            followups: [...followups, {index, followup: v.function}],
            value: !v.foldout
          }]}
        })
      ]),
      ...(v.foldout ? v.result.map((r, i) => 
        result(action, r, i, node_id, host, loading || v.status === 'loading', send, [...followups, {index, followup: v.function}])
      ) : [])
    ])
  ).flat() : [])
])


module.exports = result
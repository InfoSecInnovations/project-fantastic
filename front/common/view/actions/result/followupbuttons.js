import {h} from 'snabbdom/h'
const FormatString = require('fantastic-utils/formatstring')

export default (state, action, action_result, node_id, host, loading, send, followups) => action_result.followups ? Object.values(action_result.followups).map(v => {
  const followup_label = v.label || (typeof v.enabled == 'boolean' && (v.enabled ? 'Enabled' : 'Disabled')) || state.actions[action].names[v.function]
  if (v.not_permitted) return h('div.item', followup_label)
  const loading_followup = loading || v.status === 'loading'
  const disabled = !loading_followup && typeof v.enabled !== 'undefined' && !v.enabled
  return [
    h('div.button', 
      {
        on: loading_followup ? {} : {
          click: [
            send, 
            {
              type: 'action_followup', 
              action,
              node_id,
              host,
              followups: [...followups, {followup: v.function, label: action_result.label}],
              refresh: true,
              date: Date.now()
            }
          ]
        },
        class: {loading: loading_followup, disabled}
      }, 
      (loading_followup && 'Running...') || followup_label
    ),
    h('pre', FormatString(state.actions[action].commands[v.function], v.data))
  ]
}).flat() : []
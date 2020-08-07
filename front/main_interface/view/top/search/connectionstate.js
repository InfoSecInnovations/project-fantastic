import {h} from 'snabbdom/h'

const options = [
  'listen',
  'syn_sent',
  'syn_received',
  'established',
  'fin_wait_1',
  'fin_wait_2',
  'close_wait',
  'closing',
  'last_ack',
  'time_wait',
  'bound'
]

const selection_label = connection_state => {
  if (connection_state.length === 0 || connection_state.length === options.length) return 'all'
  if (connection_state.length === 1) return connection_state[0]
  return `${connection_state[0]} + ${connection_state.length - 1} more`
}

export default (state, send) => 
  h('div#connection_state.checkboxes selector',
    {
      on: {focusout: e => {
        if (e.relatedTarget && (e.relatedTarget.id == 'connection_state' || document.getElementById('connection_state').contains(e.relatedTarget))) return
        send({type: 'connection_foldout', value: false})}
      }
    },
    [
      h('label', 'Connection state'),
      h('div.dropdown', {
          attrs: {tabIndex: 0},
          on: {click: state.loading ? () => {} : [send, {type: 'connection_foldout', value: !state.search.connection_foldout}]},
          class: {disabled: state.loading}
        },
        [
          selection_label(state.search.connection_state),
          h('div.fas fa-chevron-down')
        ]
      ),
      state.search.connection_foldout ? h('div.states', 
        options.map(v => h('div.state', [
          h(`input#select${v}`, {
            attrs: {type: 'checkbox', disabled: state.loading, checked: state.search.connection_state.includes(v)},
            on: {change: e => send({type: 'connection_state', state: v, value: e.target.checked})}
          }),
          h('label', {attrs: {for: `select${v}`}}, v)
        ]))
      ) : undefined
    ]
  )
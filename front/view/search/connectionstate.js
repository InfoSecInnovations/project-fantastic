const H = require('snabbdom/h').default

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

const connectionState = (state, send) => 
  H('div.selector.checkboxes', [
    H('label', 'Connection state'),
    H('select', {on: {click: [send, {type: 'connection_foldout', value: !state.search.connection_foldout}]}}, [
      H('option', {attrs: {selected: true}}, state.search.connection_state.length ? state.search.connection_state[0] : 'all') // this is a dummy option to show the selection
    ]),
    state.search.connection_foldout ? H('div.states', 
      options.map(v => H('div.state', [
        H(`input#select${v}`, {
          attrs: {type: 'checkbox', checked: state.search.connection_state.includes(v)},
          on: {change: e => send({type: 'connection_state', state: v, value: e.target.checked})}
        }),
        H('label', {attrs: {for: `select${v}`}}, v)
      ]))) : undefined
  ])

module.exports = connectionState
import {h} from 'snabbdom/h'

export default (state, send, title, description, inputView) => h('div.column', [
  h('h3', title),
  h('div', description),
  inputView,
  h('div.row', [
    h('div.button', {
      on: { click: e => send({type: 'action_previous_wizard'}) }
    }, 'Previous'),
    h('div.button', {
      on: { click: e => send({type: 'action_next_wizard'}) }
    }, 'Next')
  ])
])
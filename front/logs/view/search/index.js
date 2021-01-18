import {h} from 'snabbdom/h'
import Controls from './controls'

const event_checkbox = (send, event_type, label) => h('div.checkbox', [
  h(`input#${event_type}_check`, {
    attrs: {type: 'checkbox'},
    on: {click: e => send({type: 'enable_event_type', enabled: e.target.checked, event_type})} 
  }),
  h('label', {attrs: {for: `${event_type}_check`}}, label)
])

export default (state, send) => h('div.search', [
  h('div.text_search', [
    h('label', {attrs: {for: 'username_search'}}, 'username'),
    h('input#username_search', {
      attrs: {type: 'text'},
      on: {input: e => send({type: 'username_search', username: e.target.value})}
    })
  ]),
  h('div.checkboxes', [
    event_checkbox(send, 'action', 'Actions'),
    event_checkbox(send, 'test', 'Tests'),
    event_checkbox(send, 'quest', 'Quests'),
    event_checkbox(send, 'command', 'Host Data Commands'),
    event_checkbox(send, 'story', 'Story Nodes')
  ]),
  h('div.button', {
    on: {click: [send, {type: 'page', page: 0}]}
  }, 'Search'),
  Controls(state, send)
])
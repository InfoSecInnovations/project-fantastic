import {h} from 'snabbdom/h'
const CompareEvent = require('@infosecinnovations/fantastic-utils/compareevent')
import LogHeader from '@infosecinnovations/fantastic-front/view/history/logheader'

const log_content = (state, log) => {
  if (log.event_type == 'scan' && log.parameters) {
    const parameters = JSON.parse(log.parameters)
    return [
      'Parameters used:',
      h('ul', Object.entries(parameters).map(v => h('li', `${v[0]}: ${v[1]}`)))
    ]
  }
  if (log.event_type == 'command') {
    return log.status ? ['Enabled'] : ['Disabled']
  }
  return []
}

const get_status = (state, item) => {
  if (state.history.waiting.some(v => CompareEvent(state.history.saved.find(h => h.history_id == v) || state.history.results.find(h => h.history_id == v), item))) return 'waiting'
  if (state.history.saved.some(v => CompareEvent(v, item))) return 'saved'
}

const history_item_controls = (state, send, item) => {
  const status = get_status(state, item)
  return h('div.history_controls', [
    status == 'waiting' ? 
    h('span.fas fa-ellipsis-h fa-fw history_control waiting') :
    h('span.fas fa-star fa-fw history_control', {
      on: {click: () => send({type: 'save', remove: status == 'saved', history_id: item.history_id})},
      class: {favorited: status == 'saved'}
    }),
    h('span.fas fa-redo-alt fa-fw history_control', {on: {click: () => {
      if (item.event_type == 'scan') {
        send({type: 'run_scan', scan: item.scan, parameters: JSON.parse(item.parameters)})
        send({type: 'left_panel_state', state: 'scans'})
      }
      if (item.event_type == 'quest') {
        send({type: 'run_quest', quest: item.quest})
        send({type: 'left_panel_state', state: 'quests'})
      }
      if (item.event_type == 'command') {
        send({type: 'enable_command', command: item.command, enabled: item.status ? true : false})
        send({type: 'left_panel_state', state: 'host_data'})
      }
    }}})
  ])
}

const saved = (state, send) => {
  if (!state.history.saved.length) return []
  return [ 
    h('h2.panel_title', 'Saved Workflows'),
    h('div.scroll', state.history.ordering ?
      h('h3.scroll_item waiting', 'Please wait...') :
      state.history.saved.map((v, i) => h('div.scroll_item', {
        attrs: {draggable: 'true'}, // draggable won't work unless it's a string with the value "true"
        on: {
          dragstart: e => e.dataTransfer.setData('text/plain', i),
          drop: e => {
            e.preventDefault() // preventDefault stops other events interfering with drag and drop
            send({type: 'order_saved', a: v.saved_id, b: state.history.saved[parseInt(e.dataTransfer.getData('text/plain'))].saved_id})
          },
          dragover: e => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
          }
        }
      }, [
        h('div.history_title', [
          history_item_controls(state, send, v),
          h('h4', LogHeader(state, v))
        ]),
        ...log_content(state, v)
      ]))
    )
  ]
}

const history = (state, send) => {
  if (!state.history.results.length) return [
    h('h3.panel_title', 'Run scans, complete quests or toggle host data commands to see something here!')
  ]
  return [
    h('h2.panel_title', 'History'),
    h('div.scroll', state.history.results.map(v => h('div.scroll_item', [
      h('div.history_title', [
        history_item_controls(state, send, v),
        h('h4', LogHeader(state, v))
      ]),
      ...log_content(state, v)
    ])))
  ]
}

export default (state, send) => h('div.scroll_container', [
  ...saved(state, send),
  ...history(state, send)
])
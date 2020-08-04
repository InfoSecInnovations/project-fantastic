import {h} from 'snabbdom/h'
const CompareEvent = require('fantastic-utils/compareevent')

const headers = {
  action: 'Run Action',
  test: 'Run Test',
  quest: 'Run Quest',
  command: 'Set Host Data Command'
}

const log_name = (state, log) => {
  if (log.event_type == 'action') return state.actions[log.action].name
  if (log.event_type == 'test') return state.tests[log.test].name
  if (log.event_type == 'quest') return state.quests[log.quest].name
  if (log.event_type == 'command') return state.commands[log.command].name
}

const log_content = (state, log) => {
  if (log.event_type == 'test') {
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
  if (state.history.waiting.some(v => CompareEvent(state.history.favorites.find(h => h.history_id == v) || state.history.results.find(h => h.history_id == v), item))) return 'waiting'
  if (state.history.favorites.some(v => CompareEvent(v, item))) return 'favorited'
}

const history_item_controls = (state, send, item) => {
  const status = get_status(state, item)
  return h('div.history_controls', [
    status == 'waiting' ? 
    h('span.fas fa-ellipsis-h fa-fw history_control waiting') :
    h('span.fas fa-star fa-fw history_control', {
      on: {click: () => send({type: 'favorite', remove: status == 'favorited', history_id: item.history_id})},
      class: {favorited: status == 'favorited'}
    }),
    h('span.fas fa-redo-alt fa-fw history_control', {on: {click: () => {
      if (item.event_type == 'test') {
        send({type: 'run_test', test: item.test, parameters: JSON.parse(item.parameters)})
        send({type: 'left_panel_state', state: 'tests'})
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

const favorites = (state, send) => {
  if (!state.history.favorites.length) return []
  return [ 
    h('h2.panel_title', 'Favorites'),
    h('div.scroll', state.history.ordering ?
      h('h3.scroll_item waiting', 'Please wait...') :
      state.history.favorites.map((v, i) => h('div.scroll_item', {
        attrs: {draggable: 'true'}, // draggable won't work unless it's a string with the value "true"
        on: {
          dragstart: e => e.dataTransfer.setData('text/plain', i),
          drop: e => {
            e.preventDefault() // preventDefault stops other events interfering with drag and drop
            send({type: 'order_favorites', a: v.favorite_id, b: state.history.favorites[parseInt(e.dataTransfer.getData('text/plain'))].favorite_id})
          },
          dragover: e => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
          }
        }
      }, [
        h('div.history_title', [
          history_item_controls(state, send, v),
          h('h4', `${headers[v.event_type]}: ${log_name(state, v)}`)
        ]),
        ...log_content(state, v)
      ]))
    )
  ]
}

const history = (state, send) => {
  if (!state.history.results.length) return [
    h('h3.panel_title', 'Run tests, complete quests or toggle host data commands to see something here!')
  ]
  return [
    h('h2.panel_title', 'History'),
    h('div.scroll', state.history.results.map(v => h('div.scroll_item', [
      h('div.history_title', [
        history_item_controls(state, send, v),
        h('h4', `${headers[v.event_type]}: ${log_name(state, v)}`)
      ]),
      ...log_content(state, v)
    ])))
  ]
}

export default (state, send) => h('div.scroll_container', [
  ...favorites(state, send),
  ...history(state, send)
])
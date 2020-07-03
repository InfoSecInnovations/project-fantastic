const H = require('snabbdom/h').default
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
    return H('div.parameters history_item', [
      H('div.item', 'Parameters used:'),
      H('ul', Object.entries(parameters).map(v => H('li', `${v[0]}: ${v[1]}`)))
    ])
  }
  if (log.event_type == 'command') {
    return H('div.item', log.status ? 'Enabled' : 'Disabled')
  }
}

const get_status = (state, item) => {
  if (state.history.waiting.some(v => CompareEvent(state.history.favorites.find(h => h.history_id == v) || state.history.results.find(h => h.history_id == v), item))) return 'waiting'
  if (state.history.favorites.some(v => CompareEvent(v, item))) return 'favorited'
}

const history_item_controls = (state, send, item) => {
  const status = get_status(state, item)
  return H('div.history_controls', [
    status == 'waiting' ? 
    H('span.fas fa-ellipsis-h fa-fw history_control waiting') :
    H('span.fas fa-star fa-fw history_control', {
      on: {click: () => send({type: 'favorite', remove: status == 'favorited', history_id: item.history_id})},
      class: {favorited: status == 'favorited'}
    }),
    H('span.fas fa-redo-alt fa-fw history_control', {on: {click: () => {
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
    H('div.title', 'Favorites'),
    H('div.scroll', state.history.ordering ?
      H('div.scroll_item subtitle waiting', 'Please wait...') :
      state.history.favorites.map((v, i) => H('div.scroll_item history_item', {
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
        H('div.history_title', [
          history_item_controls(state, send, v),
          H('div.subsubtitle', `${headers[v.event_type]}: ${log_name(state, v)}`)
        ]),
        H('div.item', log_content(state, v))
      ]))
    )
  ]
}

const history = (state, send) => {
  if (!state.history.results.length) return [
    H('div.title', 'Run tests, complete quests or toggle host data commands to see something here!')
  ]
  return [
    H('div.title', 'History'),
    H('div.scroll', state.history.results.map(v => H('div.scroll_item history_item', [
      H('div.history_title', [
        history_item_controls(state, send, v),
        H('div.subsubtitle', `${headers[v.event_type]}: ${log_name(state, v)}`)
      ]),
      H('div.item', log_content(state, v))
    ])))
  ]
}

const history_panel = (state, send) => H('div.scroll_container.panel', [
  ...favorites(state, send),
  ...history(state, send)
])

module.exports = history_panel
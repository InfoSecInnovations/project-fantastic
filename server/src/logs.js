import { h, app } from "https://unpkg.com/hyperapp"

// ---- UTIL

const generate_query = obj => Object.entries(obj).map(v => {
  const value = Array.isArray(v[1]) ? `[${v[1]}]` : v[1]
  return `${v[0]}=${value}`
}).join('&')

// ---- ACTION

const change_page = (state, page) => [
  {...state, page},
  set_page(state, page)
]

const set_username_search = (state, event) => ({...state, search: {...state.search, username: event.target.value}})

// ---- EFFECT

const fetch_json = (dispatch, options) =>
  fetch(options.url)
  .then(response => response.json())
  .then(data => dispatch(options.onresponse, data))
  .catch(() => dispatch(options.onresponse, {}))

const assign = (state, key, data) => ({...state, [key]: data})

const set_page = (state, page) => [
  fetch_json,
  {
    url: `/logs?${generate_query({...state.search, ...(page && {page})})}`,
    onresponse: (state, data) => ({...state, logs: data.results, last_page: data.is_last})
  }
]

const init_effects = [
  ...(['actions', 'tests', 'quests', 'commands'].map(v => [
    fetch_json,
    {
      url: `/${v}`,
      onresponse: (state, data) => assign(state, v, data)
    }
  ])),
  set_page(0)
]

// ---- VIEW

const headers = {
  action: 'Run Action',
  test: 'Run Test',
  quest: 'Run Quest',
  command: 'Set Host Data Command'
}

const test_results = (data, results) => {
  return {
    pass: results.every(v => v.result == data.pass.condition),
    failed: results.filter(v => v.result != data.pass.condition)
  }
}

const log_details = (state, log) => {
  if (log.event_type == 'action') {
    if (log.function == 'run') return
    return h('div', {class: 'log_details'}, `Followup action: ${log.function}`)
  }
  if (log.event_type == 'test') {
    const results = test_results(state.tests[log.test], JSON.parse(log.results))
    return h('div', {class: 'log_details'}, results.pass ? 'All nodes passed' : `${results.failed.length} nodes failed`)
  }
  if (log.event_type == 'quest') {
    const results = test_results(state.quests[log.quest], JSON.parse(log.results))
    return h('div', {class: 'log_details'}, results.pass ? 'All nodes passed' : `${results.failed.length} nodes failed`)
  }
  if (log.event_type == 'command') {
    return h('div', {class: 'log_details'}, `${log.status ? 'Enabled' : 'Disabled'}`)
  }
}

const log_name = (state, log) => {
  if (log.event_type == 'action') return state.actions[log.action].name
  if (log.event_type == 'test') return state.tests[log.test].name
  if (log.event_type == 'quest') return state.quests[log.quest].name
  if (log.event_type == 'command') return state.commands[log.command].name
}

const log_view = (state, log) => h('div', {class: 'log'}, [
  h('div', {class: 'log_details log_name'}, [h('b', {}, headers[log.event_type]), log_name(state, log)]),
  h('div', {class: 'log_details'}, [
    h('div', {}, log.user.username),
    h('div', {}, new Date(log.date).toString())
  ]),
  log_details(state, log)
])

const controls = state => h('div', {class: 'controls'}, [
  h('div', {
    class: ['foldout fas fa-step-backward fa-fw', {disabled: state.page === 0}],
    onClick: [change_page, 0]
  }),
  h('div', {
    class: ['foldout fas fa-chevron-left fa-fw', {disabled: state.page === 0}],
    onClick: [change_page, state.page - 1]
  }),
  h('div', {
    class: ['foldout fas fa-chevron-right fa-fw', {disabled: state.last_page}],
    onClick: [change_page, state.page + 1]
  })
])

const filtering = state => h('div', {class: 'filtering'}, [
  h('div', {class: 'text_search'}, [
    h('label', {for: 'username_search'}, 'username'),
    h('input', {
      id: 'username_search',
      onInput: set_username_search
    })
  ]),
  h('div', {class: 'checkboxes'}, [
    h('div', {class: 'checkbox'}, [
      h('input', {type: 'checkbox', id: 'actions_check'}),
      h('label', {for: 'actions_check'}, 'Actions')

    ]),
    h('div', {class: 'checkbox'}, [
      h('input', {type: 'checkbox', id: 'tests_check'}),
      h('label', {for: 'tests_check'}, 'Tests')
    ]),
    h('div', {class: 'checkbox'}, [
      h('input', {type: 'checkbox', id: 'quests_check'}),
      h('label', {for: 'quests_check'}, 'Quests')
    ]),
    h('div', {class: 'checkbox'}, [
      h('input', {type: 'checkbox', id: 'commands_check'}),
      h('label', {for: 'commands_check'}, 'Host Data Commands')
    ])
  ]),
  h('div', {
    class: 'button',
    onClick: [change_page, 0]
  }, 'Search')

])

// ---- RUN

app({
  node: document.getElementById('logs'),
  init: [
    {
      page: 0,
      search: {}
    }, 
    init_effects
  ],
  view: state => {
    if (!state.actions || !state.quests || !state.tests) return
    if (state.logs) return h('div', {id: 'logs'}, [
      h('div', {class: 'search'}, [
        filtering(state),
        controls(state)
      ]),
      h('div', {}, state.logs.map(v => log_view(state, v))),
      controls(state)
    ])
  }
})
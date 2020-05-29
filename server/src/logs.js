import { h, app } from "https://unpkg.com/hyperapp"

const headers = {
  action: 'Run Action',
  test: 'Run Test',
  quest: 'Run Quest'
}

const fetch_json = (dispatch, options) =>
  fetch(options.url)
  .then(response => response.json())
  .then(data => dispatch(options.onresponse, data))
  .catch(() => dispatch(options.onresponse, {}))

const set_logs = (state, logs) => ({
  ...state,
  logs
})

app({
  node: document.getElementById('logs'),
  init: [
    {
      logs: []
    }, 
    [
      fetch_json,
      {
        url: '/logs',
        onresponse: set_logs
      }
    ]
  ],
  view: state => {
    if (state.logs) return h('div', {}, state.logs.map(v =>
      h('div', {class: 'item'}, [
        h('div', {class: 'subtitle'}, headers[v.event_type]),
        h('div', {}, v.user.username),
        h('div', {}, new Date(v.date).toString())
      ])
    ))
  }
})
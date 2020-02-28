const H = require('snabbdom/h').default

const display = (action, line, hostname, host, send, id, keys) => {
  if (typeof(line) === 'object') {
    if (line.type == 'button') return H(
      'div.button', 
      {
        on: {click: [send, {
          type: 'action_followup', 
          action,
          function: line.click.function,
          data: line.click.data,
          hostname,
          host,
          id,
          keys
        }]},
        class: line.class
      },
      line.text
    )
  }
  return H('div', line)
}

const result = (action, action_result, hostname, host, send, keys = []) => H('div.item', Object.entries(action_result.value).map(v => {
    if (v[0] === 'value') return v[1].map(v => display(action, v, hostname, host, send, action_result.key, keys))
    return Object.entries(v[1])
      .map(r => result(action, {key: r[0], value: r[1]}, hostname, host, send, [...keys, {function: v[0], id: action_result.key}]))
}).flat())


module.exports = result
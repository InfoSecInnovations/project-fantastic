const H = require('snabbdom/h').default

const result = (action, action_result, hostname, send) => H('div.item', action_result.map(v => {
  if (typeof(v) === 'object') {
    if (v.type == 'button') return H(
      'div.button', 
      {
        on: {click: [send, {
          type: 'action_followup', 
          action,
          function: v.click.function,
          data: v.click.data,
          hostname
        }]},
        class: v.class
      },
      v.text
    )
  }
  return H('div', v)
}))

module.exports = result
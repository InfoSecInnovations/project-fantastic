const H = require('snabbdom/h').default

const result = (action, action_result, send) => H('div.item', Object.entries(action_result).map(v => {
  if (v[0] === 'button') return H('div.button', {
      on: {click: [send, {
        type: 'action_followup', 
        action,
        function: v[1].click.function,
        data: v[1].click.data
      }]},
      class: v[1].class
    },
    v[1].text)
  return v[1]
}))

module.exports = result
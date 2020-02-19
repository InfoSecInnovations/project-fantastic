const H = require('snabbdom/h').default

const commands = (state, send) => {
  if (!state.commands) return
  return H('div#commands', 
    H('div.section', [
      H('div.title', 'Host Data Commands'),
      H('div.commands', Object.entries(state.commands).map(v => H('div.command', [
        H('div.command_top', [
          H('div.subtitle', v[1].name),
          H('div.button', 
            {
              on: {click: [send, {type: 'enable_command', command: v[0], enabled: !v[1].enabled}]},
              class: {disabled: !v[1].enabled}
            }, 
            v[1].enabled ? 'Disable' : 'Enable')
        ]),
        v[1].description ? H('div.item', v[1].description) : undefined
      ])))
    ])
  )
}

module.exports = commands
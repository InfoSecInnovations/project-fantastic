const H = require('snabbdom/h').default
const HostString = require('../../../util/hoststring')

const actions = (state, send, node) => {
  if (!state.actions) return
  return H('div.selection_panel', 
    H('div.scroll_container.section', [
      H('div.scroll', Object.entries(state.actions).map(v => H('div.scroll_item', [ // TODO: filter by possibility to execute on this node
        H('div.command_top', [
          H('div.subtitle', v[1].name),
          H('div.button', 
            { on: {click: [send, {type: 'run_action', action: v[0]}]}}, 
            'Run')
        ]),
        v[1].description ? H('div.item', v[1].description) : undefined,
        H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`])
      ])))
    ])
  )
}

module.exports = actions
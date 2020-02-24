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
            { on: {click: [send, {type: 'perform_action', action: v[0]}]}}, 
            'Run')
        ]),
        v[1].description ? H('div.item', v[1].description) : undefined,
        H('div.targets', [H('b', 'Valid targets:'), ` ${v[1].hosts.map(HostString).join(', ')}.`]),
        state.action_results[v[0]] ? H('div.results', [
          H('div.subtitle', 'Results'),
          ...state.action_results[v[0]].map(r => H('div.item', Object.entries(r).map(e => {
            if (e[0] === 'button') return H('div.button', {
                on: {click: [send, {
                  type: 'action_followup', 
                  action: [v[0]],
                  function: e[1].click.function,
                  data: e[1].click.data
                }]}
              },
              e[1].text)
            return e[1]
          })))
        ]) : undefined
      ])))
    ])
  )
}

module.exports = actions
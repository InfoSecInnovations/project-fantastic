const H = require('snabbdom/h').default

const tooltip = state => {
  if (!state.hovered.nodes.length) return
  const node = state.nodes[state.hovered.nodes[state.hovered.nodes.length - 1]]
  return H('div#tooltip', [
    H('div', node.hostname || (node.ips.length && node.ips[0]))
  ])
}

module.exports = tooltip
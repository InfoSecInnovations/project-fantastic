const H = require('snabbdom/h').default
const NodeName = require('../../../common/util/nodename')

const multi = (state, send) => {
  return H('div#selection', state.selected.nodes.map(v => H('div.item', NodeName(state.nodes[v]))))
}

module.exports = multi
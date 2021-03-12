import {h} from 'snabbdom/h'

export default (send, nodes, date, age) => {
  return nodes && h('div.link', {
    on: {click: e => {
      send({type: 'get_nodes', nodes, date: age && date - age, max_date: date})
    }}
  }, `${nodes.length} hosts scanned`)
}
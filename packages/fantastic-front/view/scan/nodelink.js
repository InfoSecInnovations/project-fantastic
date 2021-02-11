import {h} from 'snabbdom/h'
const ConvertTime = require('@infosecinnovations/fantastic-utils/converttime')

export default (send, nodes, date, selection) => {
  const age = selection && ConvertTime(selection.age)
  return nodes && h('div.link', {
    on: {click: e => {
      send({type: 'get_nodes', nodes, date: age && date - age, max_date: date})
    }}
  }, `${nodes.length} hosts scanned`)
}
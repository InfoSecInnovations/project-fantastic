const H = require('snabbdom/h').default
const Nodes = require('./nodes')
const States = require('../util/states')

const view = (state, send) => 
  H('body', [
    H('h1', "Mick and Seb's Fantastic Network Viewer"),
    H('div.search', {
      on: {change: e => send({type: 'node_state', value: e.target.value})}
    }, [
      H('label', {
        attrs: {for: 'connection-state'}
      }, 
      'Connection State'),
      H('select#connection-state', 
        {attrs: {name: 'connection-state'}},
        Object.values(States).map(v => H('option', {attrs: {value: v, selected: v == 'Established'}}, v))
      )
    ]),
    Nodes(state, send)
  ])

  module.exports = view
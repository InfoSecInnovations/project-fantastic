const H = require('snabbdom/h').default
const States = require('../util/states')

const circle_point = (r, i, total) => {  
  const theta = (Math.PI*2) / total
  const angle = theta * i
  const x = r * Math.cos(angle)
  const y = r * Math.sin(angle)
  return {x, y}
}

const address = ip => ip.includes(':') ? `[${ip}]` : ip

const search = v => States[v.State] == (state.search.node_state || 'Established')

const nodes = (state, send) => {
  if (!state.nodes) return
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  const selection = state.nodes.filter(search)
  const element_height = 32
  const element_width = 150
  return (H('div#nodes', [
    H('div.node', {
      style: {left: `${width / 2 - element_width}px`, top: `${height / 2 - element_height}px`}
    }, [
      H('p', 'YOU ARE HERE')
    ]),
    ...selection.map(
      (v, i, arr) => {
        const pos = circle_point(Math.min(width, height) / 2 - element_height, i, arr.length)
        return H('div.node', {
          style: {left: `${pos.x + width / 2 - element_width}px`, top: `${pos.y + height / 2 - element_height}px`}
          }, [
            H('p', `Local: ${address(v.LocalAddress)}:${v.LocalPort}`),
            H('p', `Remote: ${address(v.RemoteAddress)}:${v.RemotePort}`),
            H('p', `State: ${States[v.State].replace(/([a-z0-9])([A-Z])/g, '$1 $2').toUpperCase()}`)
        ])
      }
    )
  ]))
}

module.exports = nodes
const H = require('snabbdom/h').default
const States = require('../util/states')

const circle_point = (r, i, total) => {  
  const theta = (Math.PI*2) / total
  const angle = theta * i
  const x = r * Math.cos(angle)
  const y = r * Math.sin(angle)
  return {x, y}
}

const nodes = (state, send) => {
  if (!state.nodes) return
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  const selection = state.nodes.filter(v => States[v.State] == 'Established') // TODO: use user's search criteria
  return (H('div.nodes', [
    H('div.node', {
      style: {left: `${width / 2}px`, top: `${height / 2}px`}
    }, [
      H('p', 'YOU ARE HERE')
    ]),
    ...selection.map(
      (v, i, arr) => {
        if (States[v.State] != 'Established') return
        const pos = circle_point(Math.min(width, height) * 0.45, i, arr.length)
        return H('div.node', {
          style: {left: `${pos.x + width / 2}px`, top: `${pos.y + height / 2}px`}
          }, [
            H('p', `Local: ${v.LocalAddress}:${v.LocalPort}`),
            H('p', `Remote: ${v.RemoteAddress}:${v.RemotePort}`),
            H('p', `State: ${States[v.State].toUpperCase()}`)
        ])
      }
    )
  ]))
}

module.exports = nodes
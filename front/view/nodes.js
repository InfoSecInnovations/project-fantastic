const H = require('snabbdom/h').default

const circle_point = (r, i, total) => {  
  const theta = (Math.PI*2) / total
  const angle = theta * i
  const x = r * Math.cos(angle)
  const y = r * Math.sin(angle)
  return {x, y}
}

const address = ip => ip.includes(':') ? `[${ip}]` : ip

const search = v => true // TODO: search

const nodes = (state, send) => {
  if (!state.nodes) return
  const width = document.documentElement.clientWidth
  const height = document.documentElement.clientHeight
  const selection = state.nodes.filter(search)
  const element_height = 10
  const element_width = 150
  return (H('div#nodes', selection.map(
      (v, i, arr) => {
        const pos = circle_point(Math.min(width, height) / 2 - element_height, i, arr.length)
        return H('div.node', {
          style: {left: `${pos.x + width / 2 - element_width}px`, top: `${pos.y + height / 2 - element_height}px`}
          }, [
            H('p', address(v.ip))
        ])
      }
    )
  ))
}

module.exports = nodes
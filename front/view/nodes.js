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
  const radius = Math.min(width, height) / 2 - element_height
  return (H('div#nodes', selection.map(
    (v, i, arr) => {
      const pos = circle_point(radius, i, arr.length)
      return H('div.node', {
        style: {left: `${pos.x + width / 2 - element_width}px`, top: `${pos.y + height / 2 - element_height}px`}
        }, [
          H('p', address(v.ip)),
          ...v.connections.map(c => {
            const target_index = arr.findIndex(n => n.ip == c.remote_address)
            if (target_index == -1 || target_index == i) return
            const target_position = circle_point(radius, target_index, arr.length)
            const length = Math.sqrt((pos.x - target_position.x) * (pos.x - target_position.x) + (pos.y - target_position.y) * (pos.y - target_position.y));
            const angle  = Math.atan2(target_position.y - pos.y, target_position.x - pos.x) * 180 / Math.PI;
            return H('div.line', {
              style: {
                width: length,
                transform: `rotate(${angle}deg)`
              }
            })
          })
        ])
      }
    )
  ))
}

module.exports = nodes
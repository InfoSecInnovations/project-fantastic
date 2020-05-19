const GenerateQuery = require('./generatequery')

const loadNodeResults = (node, send) => {
  fetch(`/results?${GenerateQuery({node_id: node.node_id})}`)
    .then(res => res.json())
    .then(res => {
      const results = res.reduce((result, v) => {
        if (!result[v.action]) result[v.action] = {}
        if (!result[v.action][v.function]) result[v.action][v.function] = {}
        result[v.action][v.function][v.key] = {...v, data: JSON.parse(v.data)}
        return result
      }, {})
      Object.entries(results).map(r => {
        const data = r[1].run.null.data
        send({type: 'action_result', result: data, action: r[0], hostname: node.hostname, date: r[1].run.null.date})
        // TODO: fix loading followups
        /*const followup = (data, keys = []) => {
          data.forEach(d => {
            d.value.forEach(v => {
              if (v.click && r[1][v.click.function] && r[1][v.click.function][d.id]) {
                const result = r[1][v.click.function][d.id].data
                send({
                  type: 'action_followup_result', 
                  refresh: false, 
                  action: r[0],
                  function: v.click.function,
                  node_id: node.node_id,
                  hostname: node.hostname,
                  id: d.id,
                  keys,
                  result,
                  date: r[1][v.click.function][d.id].date
                })
                followup(result, [...keys, {function: v.click.function, id: d.id}])
              }
            })
          })
        }
        followup(data)*/
      })
    })
}

module.exports = loadNodeResults
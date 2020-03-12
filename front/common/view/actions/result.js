const H = require('snabbdom/h').default
const DateString = require('../../util/datestring')

const display = (action, line, foldout, status, node_id, host, send, id, keys) => {

  if (typeof(line) === 'object') {
    if (line.type == 'button') {
      const loading = status === true || status[line.click.function] === 'loading'
      return H('div.followup', [
        H('div.button', 
        {
          on: loading ? undefined : { click: [send, {
            type: 'action_followup', 
            action,
            function: line.click.function,
            data: line.click.data,
            node_id,
            host,
            id,
            keys,
            refresh: true,
            date: Date.now()
          }]},
          class: {...line.class, loading}
        },
        loading ? 'Running...' : line.text),
        typeof foldout[line.click.function] === 'boolean' ? H('div.foldout', {
          on: {click: [send, {
            type: 'followup_foldout',
            action,
            function: line.click.function,
            hostname: host,
            id,
            keys,
            value: !foldout[line.click.function]
          }]},
          class: { disabled: !foldout[line.click.function]}
        }) : undefined
      ])
    }
    if (line.type == 'header') {
      return H('div.result_header', line.text)
    }
  }
  return H('div.text', line)
}

const result = (action, action_result, node_id, host, loading, send, keys = []) => H('div.result', Object.entries(action_result.value).map((v, i, arr) => {
    if (v[0] === 'foldout') return  
    if (v[0] === 'value') return H('div.item', v[1].map(v => display(action, v, action_result.value.foldout, loading || action_result.value.status, node_id, host, send, action_result.key, keys)))
    return action_result.value.foldout[v[0]] ? 
      H('div', [
        H('div.result_time', [
          H('div.result_header', action_result.value.value.find(r => r.click && r.click.function === v[0]).text),
          H('div.time', ` Results from ${DateString((Date.now() - v[1].date) / 1000 / 60)} ago`)
        ]),
        ...Object.entries(v[1])
        .filter(r => r[0] !== 'date')
        .map(r => result(action, {key: r[0], value: r[1]}, node_id, host, loading || action_result.value.status[v[0]] === 'loading', send, [...keys, {function: v[0], id: action_result.key}]))
      ]) :
      undefined
  }).flat()
)


module.exports = result
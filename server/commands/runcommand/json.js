const get_result = (mapping, output) => {
  if (typeof mapping === 'string') return output[mapping]
  if (mapping.map) return mapping.map[output[mapping.key]] || 'unknown'
}

const json = (command, output) => output.map(v => {
  const mapping = command.run.result
  if (typeof mapping === 'string') return get_result(mapping, v)
  return Object.entries(mapping).reduce((result, r) => ({...result, [r[0]]: get_result(r[1], v)}), {})
})

module.exports = json


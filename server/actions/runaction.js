const {get} = require('../db')
const GetAction = require('../util/getpackageddata')
const UpdateResult = require('./updateresult')

const pwsh_function = func_data => {
  if (func_data.method === "cimsession") {
    if (func_data.json) return require('fantastic-cli/cimsessionjson')
    return require('fantastic-cli/cimsession')
  }
  if (func_data.json) return require('fantastic-cli/invokecommandjson')
  return require('fantastic-cli/invokecommand')
}

const parse_value = (value_data, output) => {
  if (typeof value_data !== 'object') return output[value_data]
  if (value_data.static) return value_data.static
  if (value_data.bool) {
    const value = output[value_data.bool] == 1
    if (value_data.true && value_data.false) return value ?  value_data.true : value_data.false
    return value
  }
}

const run_function = async (func_data, hostname, data) => {
  const pwsh = pwsh_function(func_data)
  const output = await pwsh(func_data.command, hostname, data)
  if (!func_data.result) return []
  return output.map(o =>
    Object.values(func_data.result).map(r => {
      const values = r.values.map(v => {
        return {
          ...v,
          content: parse_value(v.content, o),
          class: v.class && Object.entries(v.class).reduce((result, v) => ({[v[0]]: parse_value(v[1], o)}), {})
        }
      })
      return {
        id: parse_value(r.id, o),
        value: values
      }
    })
  ).flat()
}

const runAction = async (action, func, node_id, user_id, date, data, key) => {
  const row = await get({table: 'nodes', conditions: {columns: {node_id}}})
  const hostname = row.access === 'local' ? '' : row.hostname
  const obj = await GetAction(action)
  const result = await run_function(obj.functions[func], hostname, data)
  await UpdateResult(action, func, node_id, user_id, date, result, key)
  return result
}

module.exports = runAction
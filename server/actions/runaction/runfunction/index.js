const PwshFunction = require('./pwshfunction')
const ParseValue = require('./parsevalue')
const ParseObject = require('./parseobject')
const HasRole = require('fantastic-utils/hasrole')

const result = (result_data, output, action, user) => {
  if (Array.isArray(result_data)) return result_data.map(v => result(v, output, action, user))
  return {
    label: ParseValue(result_data.label, output),
    data: result_data.data && result_data.data.map(v => ParseValue(v, output)),
    followups: result_data.followups && result_data.followups.reduce((result, v) => {
      const followup_func = action.functions[v.function]
      const permitted = !followup_func.role || HasRole(user, followup_func.role)
      return {
        ...result,
        [v.function]: {
          ...v,
          data: permitted && ParseObject(v.data, output),
          enabled: ParseValue(v.enabled, output),
          not_permitted: !permitted
        }
      }
    }, {})
  }
}

const process_results = results => {
  results = results.flat()
  for (let i = 0; i < results.length;) {
    if (results.find((v, j) => j !== i && v.label === results[i].label)) results.splice(i, 1)
    else i++
  }
  return results
}

const runFunction = async (action, func, user, hostname, data) => {
  const func_data = action.functions[func]
  const output = await PwshFunction(func_data)(func_data.command, hostname, data)
  if (!func_data.result) return []
  if (func_data.json) return process_results(output.map(o => result(func_data.result, o, action, user)))
  return process_results([result(func_data.result, output, action, user)]) // TODO: better handling of non JSON output
}

module.exports = runFunction
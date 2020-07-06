const PwshFunction = require('../../../util/pwshfunction')
const ProcessJSON = require('../../../util/processjson')
const ProcessJSONObject = require('../../../util/processjsonobject')
const HasRole = require('fantastic-utils/hasrole')

const result = (result_data, output, action, user) => {
  if (Array.isArray(result_data)) return result_data.map(v => result(v, output, action, user))
  return {
    label: ProcessJSON(result_data.label, output),
    data: result_data.data && result_data.data.map(v => ProcessJSON(v, output)),
    followups: result_data.followups && result_data.followups.reduce((result, v) => {
      const followup_func = action.functions[v.function]
      const permitted = !followup_func.role || HasRole(user, followup_func.role)
      return {
        ...result,
        [v.function]: {
          ...v,
          data: permitted && ProcessJSONObject(v.data, output),
          enabled: ProcessJSON(v.enabled, output),
          label: ProcessJSON(v.label, output),
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
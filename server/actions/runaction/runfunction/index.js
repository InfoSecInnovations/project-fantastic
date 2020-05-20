const PwshFunction = require('./pwshfunction')
const ParseValue = require('./parsevalue')
const ParseObject = require('./parseobject')
const HasRole = require('fantastic-utils/hasrole')

const result = (result_data, output, action, user) => ({
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
})

const runFunction = async (action, func, user, hostname, data) => {
  const func_data = action.functions[func]
  const output = await PwshFunction(func_data)(func_data.command, hostname, data)
  if (!func_data.result) return []
  if (func_data.json) return output.map(o => result(func_data.result, o, action, user)).flat()
  return result(func_data.result, output, action, user) // TODO: better handling of non JSON output
}

module.exports = runFunction
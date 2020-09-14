const PwshFunction = require('../../../util/pwshfunction')
const ProcessJSON = require('../../../util/processjson')
const ProcessJSONObject = require('../../../util/processjsonobject')
const HasRole = require('fantastic-utils/hasrole')
const IsValid = require('fantastic-utils/isvalid')
const FS = require('fs-extra')
const GetConfigPath = require('../../../util/getconfigpath')
const Path = require('path')

const result = (result_data, output, action, user, filter) => {
  if (Array.isArray(result_data)) return result_data.map(v => result(v, output, action, user))
  return {
    pass: !filter || filter.some(v => Object.entries(v).every(v => output[v[0]] == v[1])),
    label: ProcessJSON(result_data.label, output),
    data: result_data.data && result_data.data.map(v => ProcessJSON(v, output)).filter(IsValid),
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
    if (typeof results[i].label === 'undefined' || results.find((v, j) => j !== i && v.label === results[i].label)) results.splice(i, 1)
    else i++
  }
  return results
}

const get_filter = async filter => GetConfigPath()
  .then(res => FS.readJson(Path.join(res, filter.file), {throws: false}))

const runFunction = async (action, func, user, hostname, data) => {
  const func_data = action.functions[func]
  const output = await PwshFunction(func_data)(func_data.command, hostname, data)
  if (!func_data.result) return []
  const filter = func_data.result.filter ? await get_filter(func_data.result.filter) : undefined
  if (func_data.json) return {results: process_results(output.map(o => result(func_data.result, o, action, user, filter))), filter: filter ? true : false}
  return {results: process_results([result(func_data.result, output, action, user)])} // TODO: better handling of non JSON output
}

module.exports = runFunction
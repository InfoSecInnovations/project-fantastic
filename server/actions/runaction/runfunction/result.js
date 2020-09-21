const ProcessJSON = require('../../../util/processjson')
const ProcessJSONObject = require('../../../util/processjsonobject')
const HasRole = require('fantastic-utils/hasrole')
const IsValid = require('fantastic-utils/isvalid')

/**
 * @typedef {{
 *  pass: boolean,
 *  label: string,
 *  data?: {},
 *  followups?: Object.<string, {}>
 * }} Result
 */

/**
 * 
 * @param {{}} result_data 
 * @param {{}  | string} output 
 * @param {{}} action 
 * @param {{}} user 
 * @param {boolean} filter 
 * @returns {Result | Result[]}
 */
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

module.exports = result
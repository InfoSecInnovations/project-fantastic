const ExtractValue = require('../../../util/extractvalue')
const ExtractObjectValues = require('../../../util/extractobjectvalues')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')
const IsValid = require('@infosecinnovations/fantastic-utils/isvalid')

/**
 * 
 * @param {{}} result_data 
 * @param {{}  | string} output 
 * @param {{}} action 
 * @param {import('@infosecinnovations/fantastic-utils/types').User} user 
 * @param {boolean} filter 
 * @returns {import('./types).Result | import('./types).Result[]}
 */
const result = (result_data, output, action, user, filter) => {
  if (result_data.array) return result_data.array.map(v => result(v, output, action, user, filter))
  return {
    pass: !filter || filter.some(v => Object.entries(v).every(v => output[v[0]] == v[1])),
    label: ExtractValue(result_data.label, output),
    data: result_data.data && result_data.data.map(v => ExtractValue(v, output)).filter(IsValid),
    followups: result_data.followups && result_data.followups.reduce((result, v) => {
      const followup_func = action.functions[v.function]
      const permitted = !followup_func.role || HasRole(user, followup_func.role)
      return {
        ...result,
        [v.function]: {
          ...v,
          data: permitted && ExtractObjectValues(v.data, output),
          enabled: ExtractValue(v.enabled, output),
          label: ExtractValue(v.label, output),
          not_permitted: !permitted
        }
      }
    }, {})
  }
}

module.exports = result
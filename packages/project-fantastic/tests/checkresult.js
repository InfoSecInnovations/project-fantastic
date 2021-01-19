const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
const {VM} = require('vm2')

const compare = (value, condition, parameters) => { // TODO: we might have to make this into some kind of parser. but for now we just use VM2 which is supposed to do a decent job of sandboxing the code
  const vm = new VM()
  const func = `${value} ${FormatString(condition, parameters)}`
  const result = vm.run(func)
  return result
}

const validateResult = (result_entry, condition, parameters) => {
  if (result_entry == undefined) return false
  if (condition.followup) {
    const followup_entry = Object.entries(result_entry.followups).find(f => f[0] == condition.followup)
    if (!followup_entry) return true
    const followup = followup_entry[1]
    if (typeof condition.filter.enabled == 'boolean' && condition.filter.enabled != followup.enabled) return false
  }
  else {
    const data = [...(result_entry.data || [])]
    if (typeof condition.filter == 'object') {
      if (!data.find(
          v => Object.keys(condition.filter).every(
            k => Object.keys(v).includes(k) && compare(v[k], condition.filter[k], parameters))) // the value needs to have all the keys we're searching for and pass all the comparisons on each of those
      ) return false
    }
    else if (!data.find(v => compare(v, condition.filter, parameters))) return false
  }
  return true
}

const checkResult = (result, conditions, parameters) => {
  for (const c of conditions) {
    if (c.label) {
      const result_entry = result.find(r => r.label == c.label)
      if (!validateResult(result_entry, c, parameters)) return false
    }
    else {
      for (const r of result) {
        if (!validateResult(r, c, parameters)) return false
      }
    }
  }

  return true
}

module.exports = checkResult
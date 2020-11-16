const FormatString = require('@infosecinnovations/fantastic-utils/formatstring')
const {VM} = require('vm2')

const compare = (value, condition, parameters) => { // TODO: we might have to make this into some kind of parser. but for now we just use VM2 which is supposed to do a decent job of sandboxing the code
  const vm = new VM()
  const func = `${value} ${FormatString(condition, parameters)}`
  const result = vm.run(func)
  return result
}

const checkResult = (result, condition, parameters) => {
  for (const c of Object.entries(condition)) {
    const result_entry = result.find(r => r.label == c[0])
    if (result_entry == undefined) return false
    if (typeof c[1] == 'object') {
      if (!result_entry.data.find(
          v => Object.keys(c[1]).every(
            k => Object.keys(v).includes(k) && compare(v[k], c[1][k], parameters))) // the value needs to have all the keys we're searching for and pass all the comparisons on each of those
        ) return false
    }
    else if (!result_entry.data.find(v => compare(v, c[1], parameters))) return false
  }

  return true
}

module.exports = checkResult
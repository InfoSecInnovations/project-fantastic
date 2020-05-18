const PwshFunction = require('./pwshfunction')
const ParseValue = require('./parsevalue')
const ParseObject = require('./parseobject')
const HasRole = require('fantastic-utils/hasrole')

const entry = (result, output, action, user) => {
  const values = result.values.map(v => {
    if (!v.type) return ParseValue(v, output)
    if (v.type === 'button'){
      const followup_func = action.functions[v.click.function]
      if (followup_func.role && !HasRole(user, followup_func.role)){
        return {
          type: 'not_permitted',
          content: ParseValue(v.content, output)
        }
      }
    }
    return {
      ...v,
      content: ParseValue(v.content, output),
      class: ParseObject(v.class, output),
      click: v.click && {...v.click, data: ParseObject(v.click.data, output)},  // TODO: show buttons for functions we don't have permission for as plain text instead
      date: ParseValue(v, output)
    }
  })
  return {
    id: ParseValue(result.id, output),
    value: values
  }
}

const result = (result_data, output, action, user) => Object.values(result_data).map(r => entry(r, output, action, user))

const runFunction = async (action, func, user, hostname, data) => {
  const func_data = action.functions[func]
  const output = await PwshFunction(func_data)(func_data.command, hostname, data)
  if (!func_data.result) return []
  if (func_data.json) return output.map(o => result(func_data.result, o, action, user)).flat()
  return result(func_data.result, output, action, user) // TODO: better handling of non JSON output
}

module.exports = runFunction
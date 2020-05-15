const PwshFunction = require('./pwshfunction')
const ParseValue = require('./parsevalue')
const ParseObject = require('./parseobject')

const entry = (result, output) => {
  const values = result.values.map(v => {
    if (!v.type) return ParseValue(v, output)
    return {
      ...v,
      content: ParseValue(v.content, output),
      class: ParseObject(v.class, output),
      click: v.click && {...v.click, data: ParseObject(v.click.data, output)},
      date: ParseValue(v, output)
    }
  })
  return {
    id: ParseValue(result.id, output),
    value: values
  }
}

const result = (result_data, output) => Object.values(result_data).map(r => entry(r, output))

const runFunction = async (func_data, hostname, data) => { // TODO: show buttons for functions we don't have permission for as plain text instead
  const output = await PwshFunction(func_data)(func_data.command, hostname, data)
  if (!func_data.result) return []
  if (func_data.json) return output.map(o => result(func_data.result, o)).flat()
  return result(func_data.result, output) // TODO: better handling of non JSON output
}

module.exports = runFunction
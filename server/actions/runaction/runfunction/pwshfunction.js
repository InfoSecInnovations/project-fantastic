const pwshFunction = func_data => {
  if (func_data.method === "cimsession") {
    if (func_data.json) return require('fantastic-cli/cimsessionjson')
    return require('fantastic-cli/cimsession')
  }
  if (func_data.json) return require('fantastic-cli/invokecommandjson')
  return require('fantastic-cli/invokecommand')
}

module.exports = pwshFunction
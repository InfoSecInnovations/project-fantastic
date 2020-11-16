const pwshFunction = func_data => {
  if (func_data.method === "cimsession") {
    if (func_data.json) return require('@infosecinnovations/fantastic-cli/cimsessionjson')
    return require('@infosecinnovations/fantastic-cli/cimsession')
  }
  if (func_data.json) return require('@infosecinnovations/fantastic-cli/invokecommandjson')
  return require('@infosecinnovations/fantastic-cli/invokecommand')
}

module.exports = pwshFunction
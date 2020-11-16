const pwshFunction = func_data => {
  if (func_data.method === "cimsession") {
    if (func_data.json) return require('@infosecinnovations/fantastic-powershell/cimsessionjson')
    return require('@infosecinnovations/fantastic-powershell/cimsession')
  }
  if (func_data.json) return require('@infosecinnovations/fantastic-powershell/invokecommandjson')
  return require('@infosecinnovations/fantastic-powershell/invokecommand')
}

module.exports = pwshFunction
const RunPowerShell = require('./runpowershell')

const get_process = id => RunPowerShell(`(get-process -id ${id}).name`, false)

module.exports = get_process
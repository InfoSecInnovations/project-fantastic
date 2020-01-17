const RunPowerShell = require('./runpowershell')

const get_process = id => RunPowerShell(`(get-process -id ${id}).name`, false).then(res => res || 'unknown')

module.exports = get_process
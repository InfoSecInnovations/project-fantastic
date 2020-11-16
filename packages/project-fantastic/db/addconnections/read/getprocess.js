const InvokeCommand = require('@infosecinnovations/fantastic-powershell/invokecommand')

const get_process = (id, hostname) => InvokeCommand(`(get-process -id ${id}).name`, hostname, undefined, false)

module.exports = get_process
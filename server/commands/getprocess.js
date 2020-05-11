const InvokeCommand = require('fantastic-cli/invokecommand')

const get_process = (id, hostname) => InvokeCommand(`(get-process -id ${id}).name`, hostname, false)

module.exports = get_process
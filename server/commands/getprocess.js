const InvokeCommand = require('fantastic-cli/invokecommand')

const get_process = (id, hostname) => InvokeCommand(`(get-process -id ${id}).name`, hostname)

module.exports = get_process
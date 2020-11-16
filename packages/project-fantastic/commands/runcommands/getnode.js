const RunCommand = require('./runcommand')
const RunType = require('./runtype')
const DefaultIPs = require('@infosecinnovations/fantastic-utils/defaultips')
const FlatUnique = require('@infosecinnovations/fantastic-utils/flatunique')

/**
 * run the first command of a certain type on the specified host
 * @param {Object.<string, import('../types').Command[]} commands 
 * @param {import('../types').CommandType} result_type 
 * @param {import('../types').HostType} host 
 * @param {string} hostname 
 */
const run_one_of_type = async (commands, result_type, host, hostname) => {
  if (!commands[result_type]) return undefined
  const funcs = commands[result_type].filter(v => v.hosts.includes(host))
  for (const f of funcs) { // TODO: instead of just running in order we should establish a priority so we run the best commands first
    const result = await RunCommand(f, hostname)
    if (result) return result
  }
}

const remove_line_breaks = s => s && s.replace(/\r?\n|\r/g, '') // for some reason we end up with line breaks in some of the results, which can mess with commands

/**
 * run all the relevant commands to get data about a host
 * @param {Object.<string, import('../types').Command[]} commands 
 * @param {string} [computer_name] if no computer name is provided we're getting data about the local host
 */
const getNode = async (commands, computer_name) => {
  const host = computer_name ? 'remote' : 'local' // if we didn't supply a computer name we're running this on the local machine
  const label = `${host} host${computer_name ? ` ${computer_name}` : ''}`
  console.log(`getting host data from ${label}...`)
  const ips = FlatUnique([...await RunType(commands, 'ip_addresses', host, computer_name), ...DefaultIPs])
  console.log(`got IP Addresses from ${label}.`)
  const macs = await RunType(commands, 'mac_addresses', host, computer_name)
  console.log(`got MAC Addresses from ${label}.`)
  const os = await run_one_of_type(commands, 'os', host, computer_name)
  console.log(`got OS from ${label}.`)
  const hostname = await run_one_of_type(commands, 'hostname', host, computer_name).then(remove_line_breaks)
  console.log(`got hostname from ${label}.`)
  console.log(`Got data from ${label}.`)
  return {ips, macs, os, hostname, important: true}
}

module.exports = getNode
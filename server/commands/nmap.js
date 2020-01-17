const Shell = require('node-powershell')
const FS = require('fs').promises
const ParseXML = require('xml2js').parseStringPromise

const node = host => {
  const get_address = type => {
    const address = host.address.find(v => v.$.addrtype == type)
    return address && address.$.addr
  }
  const get_vendor = () => {
    const address = host.address.find(v => v.$.addrtype == 'mac')
    return address && address.$.vendor
  }
  const ips = []
  const ipv4 = get_address('ipv4')
  if (ipv4) ips.push(ipv4)
  const ipv6 = get_address('ipv6')
  if (ipv6) ips.push(ipv6)
  return {
    ips,
    mac: get_address('mac'),
    vendor: get_vendor(),
    hostname: host.hostnames.length ? host.hostnames[0].hostname[0].$.name : ''
  }
}

const filename = 'nmap.xml'
const nmap = async () => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  })
  ps.addCommand(`nmap -oX ${filename} -T4 -F 192.168.1.0/24`)
  const result = await ps.invoke()
  .then(() => FS.readFile(filename))
  .then(res => ParseXML(res))
  .then(res => res.nmaprun.host.map(v => node(v)))
  .catch(rej => console.log(`Getting nmap results failed: ${rej}`))
  ps.dispose()
  return result
}

module.exports = nmap
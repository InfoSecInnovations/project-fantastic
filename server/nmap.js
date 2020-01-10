const Shell = require('node-powershell')
const FS = require('fs').promises
const ParseXML = require('xml2js').parseStringPromise

const node = host => {
  const get_address = type => {
    const address = host.address.find(v => v.$.addrtype == type)
    return address && address.$.addr
  }
  return {
    ipv4: get_address('ipv4'),
    ipv6: get_address('ipv6'),
    mac: get_address('mac'),
    hostname: host.hostnames.length ? host.hostnames[0].hostname[0].$.name : '',
    connections: [],
  }
}

const filename = 'nmap.xml'
const nmap = async () => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  })
  ps.addCommand(`nmap -oX ${filename} 192.168.1.0/24`)
  const result = await ps.invoke()
  .then(res => FS.readFile(filename))
  .then(res => ParseXML(res))
  .then(res => res.nmaprun.host.map(v => node(v)))
  ps.dispose()
  return result
}

module.exports = nmap
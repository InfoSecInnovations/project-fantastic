const CimSessionJSON = require('fantastic-cli/cimsessionjson')
const DefaultIPs = require('fantastic-utils/defaultips')

const getNetIPAddress = hostname => CimSessionJSON('get-netipaddress', hostname)
  .then(res => res.reduce(
    (result, v) => {
      if (!result.ips.includes(v.IPAddress)) result.ips.push(v.IPAddress)
      return result
    }, 
    {ips: [...DefaultIPs], important: true}
  ))

module.exports = getNetIPAddress
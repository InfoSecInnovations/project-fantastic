module.exports = {
  actions: {
    firewall: 'actions/firewall.json',
    lastBoot: 'actions/lastboot.json',
    getInstalledSoftware: 'actions/getinstalledsoftware.json',
    getMpComputerStatus: 'actions/getmpcomputerstatus.json',
    loggedInUsers: 'actions/loggedinusers.json',
    getUSBDevices: 'actions/getusbdevices.json'
  },
  tests: {
    checkReboot: 'tests/checkreboot.json'
  },
  commands: {
    getDnsClientCache: 'commands/getdnsclientcache.json',
    getHostname: 'commands/gethostname.json',
    getMacAddress: 'commands/getmacaddress.json',
    getNetIpAddress: 'commands/getnetipaddress.json',
    getNetTcpConnection: 'commands/getnettcpconnection.json',
    getOs: 'commands/getos.json',
    nmap: 'commands/nmap.json'
  }
}
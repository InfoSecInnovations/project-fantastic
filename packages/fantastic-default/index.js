module.exports = {
  actions: {
    firewall: 'actions/firewall.json',
    lastBoot: 'actions/lastboot.json',
    getInstalledSoftware: 'actions/getinstalledsoftware.json',
    getMpComputerStatus: 'actions/getmpcomputerstatus.json',
    loggedInUsers: 'actions/loggedinusers.json',
    getUSBDevices: 'actions/getusbdevices.json',
    getCertificates: "actions/getcertificates.json",
    installSysmon: "actions/installsysmon.json",
    checkSysmon: "actions/checksysmon.json",
    killConnectionProcess: "actions/killconnectionprocess.json",
    firewallBlockApplication: "actions/firewallblockapplication.json"
  },
  tests: {
    checkReboot: 'tests/checkreboot.json',
    reviewUsbDevices: 'tests/reviewusbdevices.json',
    reviewCertificates: 'tests/reviewcertificates.json'
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
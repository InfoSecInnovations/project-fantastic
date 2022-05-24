const defaultConfig = {
  "use_child_process": true,
  "port": 5000,
  "assets": {
    "packages": [
      "@infosecinnovations/fantastic-default"
    ],
    "force_commands": [
      "@infosecinnovations/fantastic-default/getmacaddress",
      "@infosecinnovations/fantastic-default/getnetipaddress",
      "@infosecinnovations/fantastic-default/getnettcpconnection"
    ],
    "default_enable_commands": [
      "@infosecinnovations/fantastic-default/gethostname",
      "@infosecinnovations/fantastic-default/getdnsclientcache",
      "@infosecinnovations/fantastic-default/getos"
    ],
    "force_inventory": [],
    "default_enable_inventory": [
      "@infosecinnovations/fantastic-default/usbdevices"
    ]
  },
  "client": {
    "nodeCountWarning": 500
  }
}

module.exports = defaultConfig
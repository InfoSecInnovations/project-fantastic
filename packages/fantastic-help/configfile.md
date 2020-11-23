# Configuration file

```
{
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
    ]
  },
  "authentication": {
    "module": "@infosecinnovations/fantastic-default_auth"
  }
}
```

## use_child_process

If this is enabled the data acquisition will run in a different process from the http server making the requests more responsive. You generally want this enabled, the option to turn it off mostly exists for debugging purposes.

## port

The port used to connect to the server.

## assets

### packages

NPM Packages used to load Fantastic content

### force_commands

These host data commands will always be enabled

**IMPORTANT:** if you remove any of the defaults from the forced commands you run the risk of not collecting enough data to be useful. We recommend that you have at least one of each of these data types enabled at all times: `ips`, `macs`, `connections`.

### default_enable_commands

These host data commands will be enabled by default, but can be disabled

## authentication

### module

Package to use for user authentication.

### config

*Optional*

If your authentication module can accept configuraiton options, specify them here
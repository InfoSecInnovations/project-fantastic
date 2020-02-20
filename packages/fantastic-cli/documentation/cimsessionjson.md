# cimsessionjson

`fantastic-cli/cimsessionjson`

Execute a PowerShell cmdlet which can use a CimSession (see Microsoft documentation to check if the cmdlet has a CimSession parameter or not), and return a Promise which provides the output as a JavaScript Object.

## Parameters

`command` the PowerShell command to be executed on the host.

`hostname` (optional) the name of the computer to execute the command on. If no hostname is provided it will execute on the local host.
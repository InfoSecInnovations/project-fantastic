# invokecommand

`fantastic-cli/invokecommand`

Execute a PowerShell command using PowerShell's `Invoke-Command -ScriptBlock`. Returns a Promise which provides the raw output from the command. 

## Parameters

`command` the PowerShell command to be executed on the host.

`hostname` (optional) the name of the computer to execute the command on. If no hostname is provided it will execute on the local host.
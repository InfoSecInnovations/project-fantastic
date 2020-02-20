# runpowershell

`fantastic-cli/runpowershell`

Run a command in PowerShell. Returns a Promise which provides the raw output of the command. Note that if the command fails the Promise resolves with an empty string rather than rejecting. All the other functions are based on this one.

## Parameters

`command` The PowerShell command to be executed.

`log` (optional) If the command fails, output the error to the console. The default is `true`
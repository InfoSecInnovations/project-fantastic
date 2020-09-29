**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-cli/invokecommand"

# Module: "packages/fantastic-cli/invokecommand"

## Index

### Variables

* [RunPowerShell](_packages_fantastic_cli_invokecommand_.md#runpowershell)

### Functions

* [invokeCommand](_packages_fantastic_cli_invokecommand_.md#invokecommand)

## Variables

### RunPowerShell

• `Const` **RunPowerShell**: [child](_packages_fantastic_cli_runpowershell_.md#child) = require('./runpowershell')

*Defined in [packages/fantastic-cli/invokecommand.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/invokecommand.js#L1)*

## Functions

### invokeCommand

▸ `Const`**invokeCommand**(`command`: string, `hostname`: string, `params`: Object, `log`: boolean): Promise\<string>

*Defined in [packages/fantastic-cli/invokecommand.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/invokecommand.js#L11)*

Execute a PowerShell command using PowerShell's "Invoke-Command -ScriptBlock".

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | string |  |
`hostname` | string |  |
`params` | Object |  |
`log` | boolean | Enable error logging. |

**Returns:** Promise\<string>

The raw output from the PowerShell command.

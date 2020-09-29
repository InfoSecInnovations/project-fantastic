**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-cli/cimsession"

# Module: "packages/fantastic-cli/cimsession"

## Index

### Variables

* [RunPowerShell](_packages_fantastic_cli_cimsession_.md#runpowershell)

### Functions

* [cimSession](_packages_fantastic_cli_cimsession_.md#cimsession)

## Variables

### RunPowerShell

• `Const` **RunPowerShell**: [child](_packages_fantastic_cli_runpowershell_.md#child) = require('./runpowershell')

*Defined in [packages/fantastic-cli/cimsession.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/cimsession.js#L1)*

## Functions

### cimSession

▸ `Const`**cimSession**(`command`: string, `hostname`: string, `params`: Object, `log`: boolean): Promise\<string>

*Defined in [packages/fantastic-cli/cimsession.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/cimsession.js#L11)*

Execute a PowerShell cmdlet which can use a CimSession (see Microsoft documentation to check if the cmdlet has a CimSession parameter or not).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | string |  |
`hostname` | string |  |
`params` | Object |  |
`log` | boolean | Enable error logging. |

**Returns:** Promise\<string>

The raw output from the PowerShell command.

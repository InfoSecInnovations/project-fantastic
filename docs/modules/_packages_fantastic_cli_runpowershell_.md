**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-cli/runpowershell"

# Module: "packages/fantastic-cli/runpowershell"

## Index

### Variables

* [FormatString](_packages_fantastic_cli_runpowershell_.md#formatstring)
* [spawn](_packages_fantastic_cli_runpowershell_.md#spawn)

### Functions

* [child](_packages_fantastic_cli_runpowershell_.md#child)

## Variables

### FormatString

• `Const` **FormatString**: [formatString](_packages_fantastic_utils_formatstring_.md#formatstring) = require('fantastic-utils/formatstring')

*Defined in [packages/fantastic-cli/runpowershell.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-cli/runpowershell.js#L2)*

___

### spawn

•  **spawn**: spawn

*Defined in [packages/fantastic-cli/runpowershell.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-cli/runpowershell.js#L1)*

## Functions

### child

▸ `Const`**child**(`command`: string, `params`: Object, `log`: boolean): Promise\<string>

*Defined in [packages/fantastic-cli/runpowershell.js:11](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-cli/runpowershell.js#L11)*

Run a PowerShell command in a child process.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`command` | string | - |  |
`params` | Object | - |  |
`log` | boolean | true | Enable error logging. |

**Returns:** Promise\<string>

The result of running the command.

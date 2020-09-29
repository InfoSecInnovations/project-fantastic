**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-cli/invokecommandjson"

# Module: "packages/fantastic-cli/invokecommandjson"

## Index

### Variables

* [InvokeCommand](_packages_fantastic_cli_invokecommandjson_.md#invokecommand)
* [ProcessJSON](_packages_fantastic_cli_invokecommandjson_.md#processjson)

### Functions

* [invokeCommandJson](_packages_fantastic_cli_invokecommandjson_.md#invokecommandjson)

## Variables

### InvokeCommand

• `Const` **InvokeCommand**: [invokeCommand](_packages_fantastic_cli_invokecommand_.md#invokecommand) = require('./invokecommand')

*Defined in [packages/fantastic-cli/invokecommandjson.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/invokecommandjson.js#L1)*

___

### ProcessJSON

• `Const` **ProcessJSON**: [processJson](_packages_fantastic_cli_processjson_.md#processjson) = require('./processjson')

*Defined in [packages/fantastic-cli/invokecommandjson.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/invokecommandjson.js#L2)*

## Functions

### invokeCommandJson

▸ `Const`**invokeCommandJson**(`command`: string, `hostname`: string, `params`: Object, `log`: boolean): Promise\<Object>

*Defined in [packages/fantastic-cli/invokecommandjson.js:12](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-cli/invokecommandjson.js#L12)*

Execute a PowerShell command using PowerShell's "Invoke-Command -ScriptBlock".

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | string |  |
`hostname` | string |  |
`params` | Object |  |
`log` | boolean | Enable error logging. |

**Returns:** Promise\<Object>

The output from the PowerShell command converted to JSON.

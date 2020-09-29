**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-cli/cimsessionjson"

# Module: "packages/fantastic-cli/cimsessionjson"

## Index

### Variables

* [CimSession](_packages_fantastic_cli_cimsessionjson_.md#cimsession)
* [ProcessJSON](_packages_fantastic_cli_cimsessionjson_.md#processjson)

### Functions

* [cimSessionJson](_packages_fantastic_cli_cimsessionjson_.md#cimsessionjson)

## Variables

### CimSession

• `Const` **CimSession**: [cimSession](_packages_fantastic_cli_cimsession_.md#cimsession) = require('./cimsession')

*Defined in [packages/fantastic-cli/cimsessionjson.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-cli/cimsessionjson.js#L2)*

___

### ProcessJSON

• `Const` **ProcessJSON**: [processJson](_packages_fantastic_cli_processjson_.md#processjson) = require('./processjson')

*Defined in [packages/fantastic-cli/cimsessionjson.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-cli/cimsessionjson.js#L1)*

## Functions

### cimSessionJson

▸ `Const`**cimSessionJson**(`command`: string, `hostname`: string, `params`: Object, `log`: boolean): Promise\<Object>

*Defined in [packages/fantastic-cli/cimsessionjson.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-cli/cimsessionjson.js#L12)*

Execute a PowerShell cmdlet which can use a CimSession (see Microsoft documentation to check if the cmdlet has a CimSession parameter or not).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | string |  |
`hostname` | string |  |
`params` | Object |  |
`log` | boolean | Enable error logging. |

**Returns:** Promise\<Object>

The output from the PowerShell command converted to JSON.

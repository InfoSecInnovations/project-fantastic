**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-utils/formatstring"

# Module: "packages/fantastic-utils/formatstring"

## Index

### Variables

* [JSToPS](_packages_fantastic_utils_formatstring_.md#jstops)

### Functions

* [formatString](_packages_fantastic_utils_formatstring_.md#formatstring)
* [js\_string](_packages_fantastic_utils_formatstring_.md#js_string)

## Variables

### JSToPS

• `Const` **JSToPS**: [JStoPS](_packages_fantastic_utils_jstops_.md#jstops) = require('./jstops')

*Defined in [packages/fantastic-utils/formatstring.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/formatstring.js#L1)*

## Functions

### formatString

▸ `Const`**formatString**(`string`: string, `parameters`: Object, `mode`: \"powershell\" \| \"js\"): string

*Defined in [packages/fantastic-utils/formatstring.js:17](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/formatstring.js#L17)*

Replace placeholders in the '$key' format with corresponding values from the parameters object

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`string` | string | - |
`parameters` | Object | - |
`mode` | \"powershell\" \| \"js\" | "powershell" |

**Returns:** string

___

### js\_string

▸ `Const`**js_string**(`js`: any): undefined \| string

*Defined in [packages/fantastic-utils/formatstring.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/formatstring.js#L3)*

#### Parameters:

Name | Type |
------ | ------ |
`js` | any |

**Returns:** undefined \| string

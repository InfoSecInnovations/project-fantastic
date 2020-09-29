**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/runtype"

# Module: "server/commands/runcommands/runtype"

## Index

### Variables

* [FlatUnique](_server_commands_runcommands_runtype_.md#flatunique)
* [RunCommand](_server_commands_runcommands_runtype_.md#runcommand)

### Functions

* [runType](_server_commands_runcommands_runtype_.md#runtype)

## Variables

### FlatUnique

• `Const` **FlatUnique**: [flatUnique](_packages_fantastic_utils_flatunique_.md#flatunique) = require('fantastic-utils/flatunique')

*Defined in [server/commands/runcommands/runtype.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runtype.js#L2)*

___

### RunCommand

• `Const` **RunCommand**: [runCommand](_server_commands_runcommands_runcommand_index_.md#runcommand) = require('./runcommand')

*Defined in [server/commands/runcommands/runtype.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runtype.js#L1)*

## Functions

### runType

▸ `Const`**runType**(`commands`: Object, `result_type`: \"hosts\" \| \"connections\" \| \"ip\_addresses\" \| \"mac\_addresses\" \| \"os\" \| \"hostname\", `host`: \"local\" \| \"remote\" \| \"none\", `hostname`: string): Promise\<any[]>

*Defined in [server/commands/runcommands/runtype.js:11](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runtype.js#L11)*

Run all commands of a particular type on a host

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`commands` | Object |  |
`result_type` | \"hosts\" \| \"connections\" \| \"ip\_addresses\" \| \"mac\_addresses\" \| \"os\" \| \"hostname\" |  |
`host` | \"local\" \| \"remote\" \| \"none\" |  |
`hostname` | string |   |

**Returns:** Promise\<any[]>

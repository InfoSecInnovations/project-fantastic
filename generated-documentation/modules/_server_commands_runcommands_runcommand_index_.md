**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/runcommand/index"

# Module: "server/commands/runcommands/runcommand/index"

## Index

### Variables

* [JSONOutput](_server_commands_runcommands_runcommand_index_.md#jsonoutput)
* [PwshFunction](_server_commands_runcommands_runcommand_index_.md#pwshfunction)
* [XML](_server_commands_runcommands_runcommand_index_.md#xml)

### Functions

* [runCommand](_server_commands_runcommands_runcommand_index_.md#runcommand)

## Variables

### JSONOutput

• `Const` **JSONOutput**: [json](_server_commands_runcommands_runcommand_json_.md#json) = require('./json')

*Defined in [server/commands/runcommands/runcommand/index.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/runcommand/index.js#L2)*

___

### PwshFunction

• `Const` **PwshFunction**: [pwshFunction](_server_util_pwshfunction_.md#pwshfunction) = require('../../../util/pwshfunction')

*Defined in [server/commands/runcommands/runcommand/index.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/runcommand/index.js#L1)*

___

### XML

• `Const` **XML**: [xml](_server_commands_runcommands_runcommand_xml_.md#xml) = require('./xml')

*Defined in [server/commands/runcommands/runcommand/index.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/runcommand/index.js#L3)*

## Functions

### runCommand

▸ `Const`**runCommand**(`command`: [Command](_server_commands_types_d_.md#command), `hostname`: string): Promise\<any>

*Defined in [server/commands/runcommands/runcommand/index.js:10](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/runcommand/index.js#L10)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | [Command](_server_commands_types_d_.md#command) |  |
`hostname` | string |   |

**Returns:** Promise\<any>

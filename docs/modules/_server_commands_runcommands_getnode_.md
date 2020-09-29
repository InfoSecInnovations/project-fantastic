**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/getnode"

# Module: "server/commands/runcommands/getnode"

## Index

### Variables

* [DefaultIPs](_server_commands_runcommands_getnode_.md#defaultips)
* [FlatUnique](_server_commands_runcommands_getnode_.md#flatunique)
* [RunCommand](_server_commands_runcommands_getnode_.md#runcommand)
* [RunType](_server_commands_runcommands_getnode_.md#runtype)

### Functions

* [getNode](_server_commands_runcommands_getnode_.md#getnode)
* [remove\_line\_breaks](_server_commands_runcommands_getnode_.md#remove_line_breaks)
* [run\_one\_of\_type](_server_commands_runcommands_getnode_.md#run_one_of_type)

## Variables

### DefaultIPs

• `Const` **DefaultIPs**: string[] = require('fantastic-utils/defaultips')

*Defined in [server/commands/runcommands/getnode.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L3)*

___

### FlatUnique

• `Const` **FlatUnique**: [flatUnique](_packages_fantastic_utils_flatunique_.md#flatunique) = require('fantastic-utils/flatunique')

*Defined in [server/commands/runcommands/getnode.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L4)*

___

### RunCommand

• `Const` **RunCommand**: [runCommand](_server_commands_runcommands_runcommand_index_.md#runcommand) = require('./runcommand')

*Defined in [server/commands/runcommands/getnode.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L1)*

___

### RunType

• `Const` **RunType**: [runType](_server_commands_runcommands_runtype_.md#runtype) = require('./runtype')

*Defined in [server/commands/runcommands/getnode.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L2)*

## Functions

### getNode

▸ `Const`**getNode**(`commands`: Object, `computer_name`: undefined \| string): Promise\<{ hostname: any ; important: boolean = true; ips: any[] ; macs: any[] ; os: any  }>

*Defined in [server/commands/runcommands/getnode.js:29](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L29)*

run all the relevant commands to get data about a host

#### Parameters:

Name | Type |
------ | ------ |
`commands` | Object |
`computer_name` | undefined \| string |

**Returns:** Promise\<{ hostname: any ; important: boolean = true; ips: any[] ; macs: any[] ; os: any  }>

___

### remove\_line\_breaks

▸ `Const`**remove_line_breaks**(`s`: any): any

*Defined in [server/commands/runcommands/getnode.js:22](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`s` | any |

**Returns:** any

___

### run\_one\_of\_type

▸ `Const`**run_one_of_type**(`commands`: Object, `result_type`: [CommandType](_server_commands_types_d_.md#commandtype), `host`: [HostType](_server_commands_types_d_.md#hosttype), `hostname`: string): Promise\<any>

*Defined in [server/commands/runcommands/getnode.js:13](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/runcommands/getnode.js#L13)*

run the first command of a certain type on the specified host

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`commands` | Object |  |
`result_type` | [CommandType](_server_commands_types_d_.md#commandtype) |  |
`host` | [HostType](_server_commands_types_d_.md#hosttype) |  |
`hostname` | string |   |

**Returns:** Promise\<any>

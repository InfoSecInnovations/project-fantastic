**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/runcommands/runcommand/xml"

# Module: "server/commands/runcommands/runcommand/xml"

## Index

### Variables

* [FS](_server_commands_runcommands_runcommand_xml_.md#fs)
* [ParseXML](_server_commands_runcommands_runcommand_xml_.md#parsexml)

### Functions

* [get\_object](_server_commands_runcommands_runcommand_xml_.md#get_object)
* [traverse](_server_commands_runcommands_runcommand_xml_.md#traverse)
* [xml](_server_commands_runcommands_runcommand_xml_.md#xml)

## Variables

### FS

• `Const` **FS**: "fs/promises" = require('fs').promises

*Defined in [server/commands/runcommands/runcommand/xml.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runcommand/xml.js#L2)*

___

### ParseXML

• `Const` **ParseXML**: any = require('xml2js').parseStringPromise

*Defined in [server/commands/runcommands/runcommand/xml.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runcommand/xml.js#L1)*

## Functions

### get\_object

▸ `Const`**get_object**(`root`: any, `obj`: any): any

*Defined in [server/commands/runcommands/runcommand/xml.js:18](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runcommand/xml.js#L18)*

#### Parameters:

Name | Type |
------ | ------ |
`root` | any |
`obj` | any |

**Returns:** any

___

### traverse

▸ `Const`**traverse**(`root`: any, `path`: any): any

*Defined in [server/commands/runcommands/runcommand/xml.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runcommand/xml.js#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`root` | any |
`path` | any |

**Returns:** any

___

### xml

▸ `Const`**xml**(`command`: { description?: undefined \| string ; hosts: [HostType](_server_commands_types_d_.md#hosttype)[] ; name: string ; result_type: [CommandType](_server_commands_types_d_.md#commandtype) ; run: { command: string ; json?: undefined \| false \| true ; method?: \"invoke\" \| \"cimsession\" ; read_xml?: undefined \| false \| true ; result: string \| {}  }  }): Promise\<any>

*Defined in [server/commands/runcommands/runcommand/xml.js:56](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/commands/runcommands/runcommand/xml.js#L56)*

Get command value from XML

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`command` | { description?: undefined \| string ; hosts: [HostType](_server_commands_types_d_.md#hosttype)[] ; name: string ; result_type: [CommandType](_server_commands_types_d_.md#commandtype) ; run: { command: string ; json?: undefined \| false \| true ; method?: \"invoke\" \| \"cimsession\" ; read_xml?: undefined \| false \| true ; result: string \| {}  }  } |   |

**Returns:** Promise\<any>

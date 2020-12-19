**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/commands/types.d"

# Module: "server/commands/types.d"

## Index

### Type aliases

* [Command](_server_commands_types_d_.md#command)
* [CommandMode](_server_commands_types_d_.md#commandmode)
* [CommandType](_server_commands_types_d_.md#commandtype)
* [HostType](_server_commands_types_d_.md#hosttype)

## Type aliases

### Command

Ƭ  **Command**: { description?: undefined \| string ; hosts: [HostType](_server_commands_types_d_.md#hosttype)[] ; name: string ; result_type: [CommandType](_server_commands_types_d_.md#commandtype) ; run: { command: string ; json?: undefined \| false \| true ; method?: \"invoke\" \| \"cimsession\" ; read_xml?: undefined \| false \| true ; result: string \| {}  }  }

*Defined in [server/commands/types.d.ts:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/types.d.ts#L5)*

#### Type declaration:

Name | Type |
------ | ------ |
`description?` | undefined \| string |
`hosts` | [HostType](_server_commands_types_d_.md#hosttype)[] |
`name` | string |
`result\_type` | [CommandType](_server_commands_types_d_.md#commandtype) |
`run` | { command: string ; json?: undefined \| false \| true ; method?: \"invoke\" \| \"cimsession\" ; read_xml?: undefined \| false \| true ; result: string \| {}  } |

___

### CommandMode

Ƭ  **CommandMode**: \"disabled\" \| \"enabled\" \| \"force\"

*Defined in [server/commands/types.d.ts:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/types.d.ts#L3)*

___

### CommandType

Ƭ  **CommandType**: \"hosts\" \| \"connections\" \| \"ip\_addresses\" \| \"mac\_addresses\" \| \"os\" \| \"hostname\"

*Defined in [server/commands/types.d.ts:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/types.d.ts#L1)*

___

### HostType

Ƭ  **HostType**: \"local\" \| \"remote\" \| \"none\"

*Defined in [server/commands/types.d.ts:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/commands/types.d.ts#L2)*

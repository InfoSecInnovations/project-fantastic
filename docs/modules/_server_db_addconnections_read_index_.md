**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/read/index"

# Module: "server/db/addconnections/read/index"

## Index

### Variables

* [GetProcess](_server_db_addconnections_read_index_.md#getprocess)
* [OPEN\_READONLY](_server_db_addconnections_read_index_.md#open_readonly)
* [transaction](_server_db_addconnections_read_index_.md#transaction)

### Functions

* [read](_server_db_addconnections_read_index_.md#read)

## Variables

### GetProcess

• `Const` **GetProcess**: [get_process](_server_db_addconnections_read_getprocess_.md#get_process) = require('./getprocess')

*Defined in [server/db/addconnections/read/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/read/index.js#L2)*

___

### OPEN\_READONLY

•  **OPEN\_READONLY**: any

*Defined in [server/db/addconnections/read/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/read/index.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/db/addconnections/read/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/read/index.js#L1)*

## Functions

### read

▸ `Const`**read**(`node_id`: number, `connection`: { local_address: string ; local_port: number ; process: number ; remote_address: string ; remote_port: number ; state: string  }, `is_remote`: boolean, `processes`: Object): Promise\<{ existing: undefined \| {} ; local_ip_row: undefined \| {} ; process: undefined \| {} ; process_name: string ; remote_ip_row: undefined \| {}  }>

*Defined in [server/db/addconnections/read/index.js:11](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/read/index.js#L11)*

Read the information required to handle adding connection data

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | ID of the host in the database |
`connection` | { local_address: string ; local_port: number ; process: number ; remote_address: string ; remote_port: number ; state: string  } |  |
`is_remote` | boolean | Is this host the server or a different host? |
`processes` | Object | bookeeping for process names  |

**Returns:** Promise\<{ existing: undefined \| {} ; local_ip_row: undefined \| {} ; process: undefined \| {} ; process_name: string ; remote_ip_row: undefined \| {}  }>

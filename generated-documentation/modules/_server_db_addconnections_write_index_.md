**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/index"

# Module: "server/db/addconnections/write/index"

## Index

### Variables

* [GetLocalIPRowID](_server_db_addconnections_write_index_.md#getlocaliprowid)
* [GetProcessDatabaseID](_server_db_addconnections_write_index_.md#getprocessdatabaseid)
* [GetRemoteRowID](_server_db_addconnections_write_index_.md#getremoterowid)
* [WriteConnection](_server_db_addconnections_write_index_.md#writeconnection)
* [transaction](_server_db_addconnections_write_index_.md#transaction)

### Functions

* [write](_server_db_addconnections_write_index_.md#write)

## Variables

### GetLocalIPRowID

• `Const` **GetLocalIPRowID**: [getLocalIpRowID](_server_db_addconnections_write_getlocaliprowid_.md#getlocaliprowid) = require('./getlocaliprowid')

*Defined in [server/db/addconnections/write/index.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/index.js#L3)*

___

### GetProcessDatabaseID

• `Const` **GetProcessDatabaseID**: [getProcessID](_server_db_addconnections_write_getprocessdbid_.md#getprocessid) = require('./getprocessdbid')

*Defined in [server/db/addconnections/write/index.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/index.js#L2)*

___

### GetRemoteRowID

• `Const` **GetRemoteRowID**: [getRemoteRowID](_server_db_addconnections_write_getremoterowid_.md#getremoterowid) = require('./getremoterowid')

*Defined in [server/db/addconnections/write/index.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/index.js#L4)*

___

### WriteConnection

• `Const` **WriteConnection**: [writeConnection](_server_db_addconnections_write_writeconnection_.md#writeconnection) = require('./writeconnection')

*Defined in [server/db/addconnections/write/index.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/index.js#L5)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/db/addconnections/write/index.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/index.js#L1)*

## Functions

### write

▸ `Const`**write**(`node_id`: number, `connection`: [Connection](_server_db_types_d_.md#connection), `date`: number, `read_data`: { existing?: undefined \| {} ; local_ip_row?: undefined \| {} ; process?: undefined \| {} ; process_name?: undefined \| string ; remote_ip_row?: undefined \| {}  }): Promise\<number>

*Defined in [server/db/addconnections/write/index.js:20](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/index.js#L20)*

Write connection data to database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | ID of the host in the database |
`connection` | [Connection](_server_db_types_d_.md#connection) |  |
`date` | number |  |
`read_data` | { existing?: undefined \| {} ; local_ip_row?: undefined \| {} ; process?: undefined \| {} ; process_name?: undefined \| string ; remote_ip_row?: undefined \| {}  } | - |

**Returns:** Promise\<number>

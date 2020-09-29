**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/index"

# Module: "server/db/addconnections/index"

## Index

### Variables

* [Read](_server_db_addconnections_index_.md#read)
* [Write](_server_db_addconnections_index_.md#write)
* [update](_server_db_addconnections_index_.md#update)

### Functions

* [addConnections](_server_db_addconnections_index_.md#addconnections)

## Variables

### Read

• `Const` **Read**: [read](_server_db_addconnections_read_index_.md#read) = require('./read')

*Defined in [server/db/addconnections/index.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/index.js#L2)*

___

### Write

• `Const` **Write**: [write](_server_db_addconnections_write_index_.md#write) = require('./write')

*Defined in [server/db/addconnections/index.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/index.js#L3)*

___

### update

•  **update**: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise

*Defined in [server/db/addconnections/index.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/index.js#L1)*

## Functions

### addConnections

▸ `Const`**addConnections**(`node_id`: number, `connections`: [Connection](_server_db_types_d_.md#connection)[], `is_remote`: boolean): Promise\<void>

*Defined in [server/db/addconnections/index.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/index.js#L11)*

Add connections to the database or update if we already have them

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | ID of the host in the database |
`connections` | [Connection](_server_db_types_d_.md#connection)[] |  |
`is_remote` | boolean | Is this host the server or a different host?  |

**Returns:** Promise\<void>

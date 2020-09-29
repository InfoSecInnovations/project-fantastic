**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getnodes/index"

# Module: "server/db/getnodes/index"

## Index

### Variables

* [ConnectionConditions](_server_db_getnodes_index_.md#connectionconditions)
* [GetConnections](_server_db_getnodes_index_.md#getconnections)
* [OPEN\_READONLY](_server_db_getnodes_index_.md#open_readonly)
* [transaction](_server_db_getnodes_index_.md#transaction)

### Functions

* [getNodes](_server_db_getnodes_index_.md#getnodes)

## Variables

### ConnectionConditions

• `Const` **ConnectionConditions**: [connectionConditions](_server_db_getnodes_connectionconditions_.md#connectionconditions) = require('./connectionconditions')

*Defined in [server/db/getnodes/index.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/index.js#L2)*

___

### GetConnections

• `Const` **GetConnections**: [getConnections](_server_db_getnodes_getconnections_.md#getconnections) = require('./getconnections')

*Defined in [server/db/getnodes/index.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/index.js#L3)*

___

### OPEN\_READONLY

•  **OPEN\_READONLY**: any

*Defined in [server/db/getnodes/index.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/index.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/db/getnodes/index.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/index.js#L1)*

## Functions

### getNodes

▸ `Const`**getNodes**(`query`: [NodeQuery](_server_db_types_d_.md#nodequery)): Promise\<[Node](_server_db_types_d_.md#node) & { connections: [] ; node_id: number  }[]>

*Defined in [server/db/getnodes/index.js:10](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/index.js#L10)*

Retrieve nodes from the database based on the query object

#### Parameters:

Name | Type |
------ | ------ |
`query` | [NodeQuery](_server_db_types_d_.md#nodequery) |

**Returns:** Promise\<[Node](_server_db_types_d_.md#node) & { connections: [] ; node_id: number  }[]>

>>}

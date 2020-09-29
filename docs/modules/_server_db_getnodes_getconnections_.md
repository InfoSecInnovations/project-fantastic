**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getnodes/getconnections"

# Module: "server/db/getnodes/getconnections"

## Index

### Variables

* [ConnectionConditions](_server_db_getnodes_getconnections_.md#connectionconditions)

### Functions

* [getConnections](_server_db_getnodes_getconnections_.md#getconnections)

## Variables

### ConnectionConditions

• `Const` **ConnectionConditions**: [connectionConditions](_server_db_getnodes_connectionconditions_.md#connectionconditions) = require('./connectionconditions')

*Defined in [server/db/getnodes/getconnections.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/getconnections.js#L1)*

## Functions

### getConnections

▸ `Const`**getConnections**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `ips`: { ip_id: number  }[], `query`: [NodeQuery](_server_db_types_d_.md#nodequery), `date_conditions`: [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)[]): Promise\<any[]>

*Defined in [server/db/getnodes/getconnections.js:10](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/getconnections.js#L10)*

Get connections from the database originating from these IP addresses

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`ips` | { ip_id: number  }[] | - |
`query` | [NodeQuery](_server_db_types_d_.md#nodequery) |  |
`date_conditions` | [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)[] |   |

**Returns:** Promise\<any[]>

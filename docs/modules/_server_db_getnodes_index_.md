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

*Defined in [server/db/getnodes/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/index.js#L2)*

___

### GetConnections

• `Const` **GetConnections**: [getConnections](_server_db_getnodes_getconnections_.md#getconnections) = require('./getconnections')

*Defined in [server/db/getnodes/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/index.js#L3)*

___

### OPEN\_READONLY

•  **OPEN\_READONLY**: any

*Defined in [server/db/getnodes/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/index.js#L1)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/db/getnodes/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/index.js#L1)*

## Functions

### getNodes

▸ `Const`**getNodes**(`query`: { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  }): Promise\<{ access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } & { connections: [] ; node_id: number  }[]>

*Defined in [server/db/getnodes/index.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/getnodes/index.js#L10)*

Retrieve nodes from the database based on the query object

#### Parameters:

Name | Type |
------ | ------ |
`query` | { access?: [HostAccess](_server_db_types_d_.md#hostaccess)[] ; connection_state?: string[] ; connection_type?: \"different\_ip\" \| \"different\_host\" ; date?: undefined \| number ; max_date?: undefined \| number ; nodes?: number[] ; show_external?: undefined \| false \| true  } |

**Returns:** Promise\<{ access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } & { connections: [] ; node_id: number  }[]>

>>}

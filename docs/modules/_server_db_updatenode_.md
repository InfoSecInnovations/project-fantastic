**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/updatenode"

# Module: "server/db/updatenode"

## Index

### Variables

* [AddIPs](_server_db_updatenode_.md#addips)
* [AddMACs](_server_db_updatenode_.md#addmacs)
* [FilterColumns](_server_db_updatenode_.md#filtercolumns)

### Functions

* [updateNode](_server_db_updatenode_.md#updatenode)

## Variables

### AddIPs

• `Const` **AddIPs**: [addIps](_server_db_addips_.md#addips) = require('./addips')

*Defined in [server/db/updatenode.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/updatenode.js#L3)*

___

### AddMACs

• `Const` **AddMACs**: [addMacs](_server_db_addmacs_.md#addmacs) = require('./addmacs')

*Defined in [server/db/updatenode.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/updatenode.js#L2)*

___

### FilterColumns

• `Const` **FilterColumns**: [filterColumns](_server_db_filtercolumns_.md#filtercolumns) = require('./filtercolumns')

*Defined in [server/db/updatenode.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/updatenode.js#L1)*

## Functions

### updateNode

▸ `Const`**updateNode**(`node_id`: number, `data`: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }, `db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `overwrite`: boolean): Promise\<void>

*Defined in [server/db/updatenode.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/updatenode.js#L12)*

Update database data for a host we know the ID of

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | database ID of the host we're updating |
`data` | { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } |  |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`overwrite` | boolean |   |

**Returns:** Promise\<void>

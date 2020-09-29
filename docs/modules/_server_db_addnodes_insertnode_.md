**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addnodes/insertnode"

# Module: "server/db/addnodes/insertnode"

## Index

### Variables

* [NodeColumns](_server_db_addnodes_insertnode_.md#nodecolumns)

### Functions

* [insertNode](_server_db_addnodes_insertnode_.md#insertnode)

## Variables

### NodeColumns

• `Const` **NodeColumns**: string[] = require('../nodecolumns')

*Defined in [server/db/addnodes/insertnode.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/insertnode.js#L1)*

## Functions

### insertNode

▸ `Const`**insertNode**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `node`: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }, `date`: number): Promise\<number>

*Defined in [server/db/addnodes/insertnode.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/insertnode.js#L9)*

Insert a new node into the database and its corresponding IPs and MACs

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`node` | { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } |  |
`date` | number |   |

**Returns:** Promise\<number>

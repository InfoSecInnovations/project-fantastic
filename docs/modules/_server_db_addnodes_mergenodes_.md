**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addnodes/mergenodes"

# Module: "server/db/addnodes/mergenodes"

## Index

### Variables

* [AddIPs](_server_db_addnodes_mergenodes_.md#addips)
* [AddMACs](_server_db_addnodes_mergenodes_.md#addmacs)
* [FilterColumns](_server_db_addnodes_mergenodes_.md#filtercolumns)

### Functions

* [mergeNodes](_server_db_addnodes_mergenodes_.md#mergenodes)
* [merge\_func](_server_db_addnodes_mergenodes_.md#merge_func)

## Variables

### AddIPs

• `Const` **AddIPs**: [addIps](_server_db_addips_.md#addips) = require('../addips')

*Defined in [server/db/addnodes/mergenodes.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/mergenodes.js#L3)*

___

### AddMACs

• `Const` **AddMACs**: [addMacs](_server_db_addmacs_.md#addmacs) = require('../addmacs')

*Defined in [server/db/addnodes/mergenodes.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/mergenodes.js#L2)*

___

### FilterColumns

• `Const` **FilterColumns**: [filterColumns](_server_db_filtercolumns_.md#filtercolumns) = require('../filtercolumns')

*Defined in [server/db/addnodes/mergenodes.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/mergenodes.js#L1)*

## Functions

### mergeNodes

▸ `Const`**mergeNodes**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `node`: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }, `matches`: {}[], `overwrite`: boolean, `ids`: number[]): Promise\<void>

*Defined in [server/db/addnodes/mergenodes.js:22](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/mergenodes.js#L22)*

merge all data matching the node we're adding

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`node` | { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  } |  |
`matches` | {}[] | - |
`overwrite` | boolean |  |
`ids` | number[] | bookeeping for node IDs  |

**Returns:** Promise\<void>

___

### merge\_func

▸ `Const`**merge_func**(`node`: any, `matches`: any): (Anonymous function)

*Defined in [server/db/addnodes/mergenodes.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/mergenodes.js#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`node` | any |
`matches` | any |

**Returns:** (Anonymous function)

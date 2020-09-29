**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/getlocaliprowid"

# Module: "server/db/addconnections/write/getlocaliprowid"

## Index

### Functions

* [getLocalIpRowID](_server_db_addconnections_write_getlocaliprowid_.md#getlocaliprowid)

## Functions

### getLocalIpRowID

▸ `Const`**getLocalIpRowID**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `node_id`: number, `date`: number, `ip`: string, `local_ip_row`: undefined \| {}): Promise\<number>

*Defined in [server/db/addconnections/write/getlocaliprowid.js:10](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/write/getlocaliprowid.js#L10)*

Get ID of local IP in database, adding/updating the entry if required

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } | write transation |
`node_id` | number | database ID for local host |
`date` | number |  |
`ip` | string | local IP |
`local_ip_row` | undefined \| {} | - |

**Returns:** Promise\<number>

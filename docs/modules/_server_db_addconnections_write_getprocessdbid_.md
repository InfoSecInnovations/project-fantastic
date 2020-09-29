**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/getprocessdbid"

# Module: "server/db/addconnections/write/getprocessdbid"

## Index

### Functions

* [getProcessID](_server_db_addconnections_write_getprocessdbid_.md#getprocessid)

## Functions

### getProcessID

▸ `Const`**getProcessID**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `node_id`: number, `pid`: number, `process`: undefined \| {}, `process_name`: undefined \| string): Promise\<any>

*Defined in [server/db/addconnections/write/getprocessdbid.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/write/getprocessdbid.js#L9)*

Get the database ID for a process, adding/updating the entry if required

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } | write transaction |
`node_id` | number | database ID of the host owning the connection |
`pid` | number |  |
`process` | undefined \| {} | - |
`process_name` | undefined \| string | name of process owning the connection  |

**Returns:** Promise\<any>

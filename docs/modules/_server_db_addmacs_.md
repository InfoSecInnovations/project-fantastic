**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addmacs"

# Module: "server/db/addmacs"

## Index

### Functions

* [addMacs](_server_db_addmacs_.md#addmacs)

## Functions

### addMacs

▸ `Const`**addMacs**(`node_id`: number, `macs`: null \| { mac: string ; vendor: string  }[], `db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `overwrite`: boolean): Promise\<void>

*Defined in [server/db/addmacs.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addmacs.js#L8)*

Add MAC addresses corresponding to a node to the database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | database ID of the node owning the MACs |
`macs` | null \| { mac: string ; vendor: string  }[] | - |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`overwrite` | boolean | can we overwrite existing data?  |

**Returns:** Promise\<void>

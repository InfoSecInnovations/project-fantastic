**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addips"

# Module: "server/db/addips"

## Index

### Functions

* [addIps](_server_db_addips_.md#addips)

## Functions

### addIps

▸ `Const`**addIps**(`node_id`: number, `ips`: null \| string[], `db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `date`: number): Promise\<any>

*Defined in [server/db/addips.js:8](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addips.js#L8)*

Add IPs to the database for a node

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | database ID of the node owning the IPs |
`ips` | null \| string[] |  |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`date` | number |   |

**Returns:** Promise\<any>

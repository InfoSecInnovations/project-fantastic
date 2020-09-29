**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/getremoterowid"

# Module: "server/db/addconnections/write/getremoterowid"

## Index

### Functions

* [getRemoteRowID](_server_db_addconnections_write_getremoterowid_.md#getremoterowid)

## Functions

### getRemoteRowID

▸ `Const`**getRemoteRowID**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `node_id`: number, `date`: number, `ip`: string, `remote_ip_row`: undefined \| {}): Promise\<{ id: any = remote\_ip\_row.ip\_id; new_nodes: number = 0 }>

*Defined in [server/db/addconnections/write/getremoterowid.js:9](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/write/getremoterowid.js#L9)*

Get the database ID for the remote IP, adding/updating entries for the IP and remote host if required.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } | write transaction |
`node_id` | number | database ID of local host |
`date` | number |  |
`ip` | string | remote IP address |
`remote_ip_row` | undefined \| {} | - |

**Returns:** Promise\<{ id: any = remote\_ip\_row.ip\_id; new_nodes: number = 0 }>

**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/writeconnection"

# Module: "server/db/addconnections/write/writeconnection"

## Index

### Functions

* [writeConnection](_server_db_addconnections_write_writeconnection_.md#writeconnection)

## Functions

### writeConnection

▸ `Const`**writeConnection**(`db`: { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  }, `connection`: { local_address: string ; local_port: number ; process: number ; remote_address: string ; remote_port: number ; state: string  }, `date`: number, `existing`: undefined \| {}, `process_id`: number, `local_ip_id`: number, `remote_ip_id`: number): Promise\<void>

*Defined in [server/db/addconnections/write/writeconnection.js:11](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addconnections/write/writeconnection.js#L11)*

Write the connection data to the database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | { all: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<any[]> ; get: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise\<{} \| undefined> ; insert: (table: string,row: {}) => Promise\<number> ; remove: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise ; run: (queries: string[]) => Promise ; update: (query: [Query](_packages_fantastic_utils_db_types_d_.md#query)) => Promise  } |  |
`connection` | { local_address: string ; local_port: number ; process: number ; remote_address: string ; remote_port: number ; state: string  } |  |
`date` | number |  |
`existing` | undefined \| {} | - |
`process_id` | number | database ID of the process owning the connection |
`local_ip_id` | number | database ID of the local IP |
`remote_ip_id` | number | database ID of the remote IP  |

**Returns:** Promise\<void>

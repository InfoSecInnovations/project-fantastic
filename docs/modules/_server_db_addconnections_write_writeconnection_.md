**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/writeconnection"

# Module: "server/db/addconnections/write/writeconnection"

## Index

### Functions

* [writeConnection](_server_db_addconnections_write_writeconnection_.md#writeconnection)

## Functions

### writeConnection

▸ `Const`**writeConnection**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `connection`: [Connection](_server_db_types_d_.md#connection), `date`: number, `existing`: undefined \| {}, `process_id`: number, `local_ip_id`: number, `remote_ip_id`: number): Promise\<void>

*Defined in [server/db/addconnections/write/writeconnection.js:11](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/writeconnection.js#L11)*

Write the connection data to the database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`connection` | [Connection](_server_db_types_d_.md#connection) |  |
`date` | number |  |
`existing` | undefined \| {} | - |
`process_id` | number | database ID of the process owning the connection |
`local_ip_id` | number | database ID of the local IP |
`remote_ip_id` | number | database ID of the remote IP  |

**Returns:** Promise\<void>

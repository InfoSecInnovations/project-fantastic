**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/getprocessdbid"

# Module: "server/db/addconnections/write/getprocessdbid"

## Index

### Functions

* [getProcessID](_server_db_addconnections_write_getprocessdbid_.md#getprocessid)

## Functions

### getProcessID

▸ `Const`**getProcessID**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `node_id`: number, `pid`: number, `process`: undefined \| {}, `process_name`: undefined \| string): Promise\<any>

*Defined in [server/db/addconnections/write/getprocessdbid.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/getprocessdbid.js#L9)*

Get the database ID for a process, adding/updating the entry if required

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) | write transaction |
`node_id` | number | database ID of the host owning the connection |
`pid` | number |  |
`process` | undefined \| {} | - |
`process_name` | undefined \| string | name of process owning the connection  |

**Returns:** Promise\<any>

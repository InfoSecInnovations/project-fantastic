**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addconnections/write/getlocaliprowid"

# Module: "server/db/addconnections/write/getlocaliprowid"

## Index

### Functions

* [getLocalIpRowID](_server_db_addconnections_write_getlocaliprowid_.md#getlocaliprowid)

## Functions

### getLocalIpRowID

▸ `Const`**getLocalIpRowID**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `node_id`: number, `date`: number, `ip`: string, `local_ip_row`: undefined \| {}): Promise\<number>

*Defined in [server/db/addconnections/write/getlocaliprowid.js:10](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addconnections/write/getlocaliprowid.js#L10)*

Get ID of local IP in database, adding/updating the entry if required

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) | write transation |
`node_id` | number | database ID for local host |
`date` | number |  |
`ip` | string | local IP |
`local_ip_row` | undefined \| {} | - |

**Returns:** Promise\<number>

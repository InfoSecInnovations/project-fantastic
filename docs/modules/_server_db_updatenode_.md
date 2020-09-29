**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/updatenode"

# Module: "server/db/updatenode"

## Index

### Variables

* [AddIPs](_server_db_updatenode_.md#addips)
* [AddMACs](_server_db_updatenode_.md#addmacs)
* [FilterColumns](_server_db_updatenode_.md#filtercolumns)

### Functions

* [updateNode](_server_db_updatenode_.md#updatenode)

## Variables

### AddIPs

• `Const` **AddIPs**: [addIps](_server_db_addips_.md#addips) = require('./addips')

*Defined in [server/db/updatenode.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/updatenode.js#L3)*

___

### AddMACs

• `Const` **AddMACs**: [addMacs](_server_db_addmacs_.md#addmacs) = require('./addmacs')

*Defined in [server/db/updatenode.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/updatenode.js#L2)*

___

### FilterColumns

• `Const` **FilterColumns**: [filterColumns](_server_db_filtercolumns_.md#filtercolumns) = require('./filtercolumns')

*Defined in [server/db/updatenode.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/updatenode.js#L1)*

## Functions

### updateNode

▸ `Const`**updateNode**(`node_id`: number, `data`: [Node](_server_db_types_d_.md#node), `db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `overwrite`: boolean): Promise\<void>

*Defined in [server/db/updatenode.js:12](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/updatenode.js#L12)*

Update database data for a host we know the ID of

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | database ID of the host we're updating |
`data` | [Node](_server_db_types_d_.md#node) |  |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`overwrite` | boolean |   |

**Returns:** Promise\<void>

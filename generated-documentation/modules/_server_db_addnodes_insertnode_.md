**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addnodes/insertnode"

# Module: "server/db/addnodes/insertnode"

## Index

### Variables

* [NodeColumns](_server_db_addnodes_insertnode_.md#nodecolumns)

### Functions

* [insertNode](_server_db_addnodes_insertnode_.md#insertnode)

## Variables

### NodeColumns

• `Const` **NodeColumns**: string[] = require('../nodecolumns')

*Defined in [server/db/addnodes/insertnode.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addnodes/insertnode.js#L1)*

## Functions

### insertNode

▸ `Const`**insertNode**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `node`: [Node](_server_db_types_d_.md#node), `date`: number): Promise\<number>

*Defined in [server/db/addnodes/insertnode.js:9](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addnodes/insertnode.js#L9)*

Insert a new node into the database and its corresponding IPs and MACs

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`node` | [Node](_server_db_types_d_.md#node) |  |
`date` | number |   |

**Returns:** Promise\<number>

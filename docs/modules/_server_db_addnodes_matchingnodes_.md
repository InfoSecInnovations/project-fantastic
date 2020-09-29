**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addnodes/matchingnodes"

# Module: "server/db/addnodes/matchingnodes"

## Index

### Variables

* [DefaultIPs](_server_db_addnodes_matchingnodes_.md#defaultips)

### Functions

* [matchingNodes](_server_db_addnodes_matchingnodes_.md#matchingnodes)

## Variables

### DefaultIPs

• `Const` **DefaultIPs**: string[] = require('fantastic-utils/defaultips')

*Defined in [server/db/addnodes/matchingnodes.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addnodes/matchingnodes.js#L1)*

## Functions

### matchingNodes

▸ `Const`**matchingNodes**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `node`: [Node](_server_db_types_d_.md#node)): Promise\<any[]>

*Defined in [server/db/addnodes/matchingnodes.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addnodes/matchingnodes.js#L8)*

Find nodes matching the one we're trying to add

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`node` | [Node](_server_db_types_d_.md#node) |   |

**Returns:** Promise\<any[]>

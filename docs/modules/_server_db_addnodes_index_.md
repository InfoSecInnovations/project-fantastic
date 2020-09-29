**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addnodes/index"

# Module: "server/db/addnodes/index"

## Index

### Variables

* [InsertNode](_server_db_addnodes_index_.md#insertnode)
* [MatchingNodes](_server_db_addnodes_index_.md#matchingnodes)
* [MergeNodes](_server_db_addnodes_index_.md#mergenodes)
* [UpdateNode](_server_db_addnodes_index_.md#updatenode)
* [transaction](_server_db_addnodes_index_.md#transaction)

### Functions

* [addNodes](_server_db_addnodes_index_.md#addnodes)

## Variables

### InsertNode

• `Const` **InsertNode**: [insertNode](_server_db_addnodes_insertnode_.md#insertnode) = require('./insertnode')

*Defined in [server/db/addnodes/index.js:5](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/index.js#L5)*

___

### MatchingNodes

• `Const` **MatchingNodes**: [matchingNodes](_server_db_addnodes_matchingnodes_.md#matchingnodes) = require('./matchingnodes')

*Defined in [server/db/addnodes/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/index.js#L3)*

___

### MergeNodes

• `Const` **MergeNodes**: [mergeNodes](_server_db_addnodes_mergenodes_.md#mergenodes) = require('./mergenodes')

*Defined in [server/db/addnodes/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/index.js#L4)*

___

### UpdateNode

• `Const` **UpdateNode**: [updateNode](_server_db_updatenode_.md#updatenode) = require('../updatenode')

*Defined in [server/db/addnodes/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/index.js#L2)*

___

### transaction

•  **transaction**: (mode: number) => Promise\<[Operations](_packages_fantastic_utils_db_types_d_.md#operations)>

*Defined in [server/db/addnodes/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/index.js#L1)*

## Functions

### addNodes

▸ `Const`**addNodes**(`nodes`: { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }[], `overwrite`: boolean): Promise\<any[]>

*Defined in [server/db/addnodes/index.js:12](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/db/addnodes/index.js#L12)*

Add nodes (hosts) to the database. Will update existing data if matching hosts are found.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`nodes` | { access: [HostAccess](_server_db_types_d_.md#hostaccess) ; hostname?: undefined \| string ; important: boolean ; ips?: string[] ; macs?: Array\<{ mac: string ; vendor: string  }> ; os?: undefined \| string  }[] |  |
`overwrite` | boolean |   |

**Returns:** Promise\<any[]>

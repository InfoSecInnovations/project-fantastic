**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addmacs"

# Module: "server/db/addmacs"

## Index

### Functions

* [addMacs](_server_db_addmacs_.md#addmacs)

## Functions

### addMacs

▸ `Const`**addMacs**(`node_id`: number, `macs`: null \| { mac: string ; vendor: string  }[], `db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `overwrite`: boolean): Promise\<void>

*Defined in [server/db/addmacs.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addmacs.js#L8)*

Add MAC addresses corresponding to a node to the database

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | database ID of the node owning the MACs |
`macs` | null \| { mac: string ; vendor: string  }[] | - |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`overwrite` | boolean | can we overwrite existing data?  |

**Returns:** Promise\<void>

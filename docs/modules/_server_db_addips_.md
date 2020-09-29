**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/addips"

# Module: "server/db/addips"

## Index

### Functions

* [addIps](_server_db_addips_.md#addips)

## Functions

### addIps

▸ `Const`**addIps**(`node_id`: number, `ips`: null \| string[], `db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `date`: number): Promise\<any>

*Defined in [server/db/addips.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/addips.js#L8)*

Add IPs to the database for a node

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`node_id` | number | database ID of the node owning the IPs |
`ips` | null \| string[] |  |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`date` | number |   |

**Returns:** Promise\<any>

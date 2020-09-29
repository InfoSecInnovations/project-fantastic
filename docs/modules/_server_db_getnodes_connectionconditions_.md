**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/db/getnodes/connectionconditions"

# Module: "server/db/getnodes/connectionconditions"

## Index

### Functions

* [connectionConditions](_server_db_getnodes_connectionconditions_.md#connectionconditions)

## Functions

### connectionConditions

▸ `Const`**connectionConditions**(`dir`: \"from\" \| \"to\", `ips`: { ip_id: number  }[], `query`: [NodeQuery](_server_db_types_d_.md#nodequery)): [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)[]

*Defined in [server/db/getnodes/connectionconditions.js:8](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/db/getnodes/connectionconditions.js#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`dir` | \"from\" \| \"to\" |
`ips` | { ip_id: number  }[] |
`query` | [NodeQuery](_server_db_types_d_.md#nodequery) |

**Returns:** [QueryCondition](_packages_fantastic_utils_db_types_d_.md#querycondition)[]

**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/quests/runquest"

# Module: "server/quests/runquest"

## Index

### Variables

* [ConvertTime](_server_quests_runquest_.md#converttime)
* [GetPackagedData](_server_quests_runquest_.md#getpackageddata)
* [RunTest](_server_quests_runquest_.md#runtest)
* [getNodes](_server_quests_runquest_.md#getnodes)

### Functions

* [runQuest](_server_quests_runquest_.md#runquest)

## Variables

### ConvertTime

• `Const` **ConvertTime**: [convertTime](_packages_fantastic_utils_converttime_.md#converttime) = require('fantastic-utils/converttime')

*Defined in [server/quests/runquest.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/quests/runquest.js#L4)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/quests/runquest.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/quests/runquest.js#L1)*

___

### RunTest

• `Const` **RunTest**: [runTest](_server_tests_runtest_.md#runtest) = require('../tests/runtest')

*Defined in [server/quests/runquest.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/quests/runquest.js#L2)*

___

### getNodes

•  **getNodes**: [getNodes](_server_db_getnodes_index_.md#getnodes)

*Defined in [server/quests/runquest.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/quests/runquest.js#L3)*

## Functions

### runQuest

▸ `Const`**runQuest**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `quest`: string, `user`: [User](_packages_fantastic_utils_types_d_.md#user), `date`: number): Promise\<{ event_id: number ; results: ({ action: string = action\_path; filter: undefined \| false \| true = result.filter; node_id: any = row.node\_id; result: [Result](_server_actions_runaction_runfunction_types_d_.md#result)[] = result.results } \| { action: string = action\_path; node_id: any = row.node\_id; result: boolean = CheckResult(result.results, action.search, parameters) })[] ; rows: [Node](_server_db_types_d_.md#node) & { connections: [] ; node_id: number  }[]  }>

*Defined in [server/quests/runquest.js:13](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/quests/runquest.js#L13)*

Run a quest

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`quest` | string |  |
`user` | [User](_packages_fantastic_utils_types_d_.md#user) |  |
`date` | number |   |

**Returns:** Promise\<{ event_id: number ; results: ({ action: string = action\_path; filter: undefined \| false \| true = result.filter; node_id: any = row.node\_id; result: [Result](_server_actions_runaction_runfunction_types_d_.md#result)[] = result.results } \| { action: string = action\_path; node_id: any = row.node\_id; result: boolean = CheckResult(result.results, action.search, parameters) })[] ; rows: [Node](_server_db_types_d_.md#node) & { connections: [] ; node_id: number  }[]  }>

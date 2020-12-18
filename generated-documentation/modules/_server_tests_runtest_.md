**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/tests/runtest"

# Module: "server/tests/runtest"

## Index

### Variables

* [CheckResult](_server_tests_runtest_.md#checkresult)
* [GetAbsolutePath](_server_tests_runtest_.md#getabsolutepath)
* [GetPackagedData](_server_tests_runtest_.md#getpackageddata)
* [RunAction](_server_tests_runtest_.md#runaction)

### Functions

* [runTest](_server_tests_runtest_.md#runtest)

## Variables

### CheckResult

• `Const` **CheckResult**: [checkResult](_server_tests_checkresult_.md#checkresult) = require('./checkresult')

*Defined in [server/tests/runtest.js:3](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/tests/runtest.js#L3)*

___

### GetAbsolutePath

• `Const` **GetAbsolutePath**: [getAbsoluteDataPath](_server_util_getabsolutedatapath_.md#getabsolutedatapath) = require('../util/getabsolutedatapath')

*Defined in [server/tests/runtest.js:4](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/tests/runtest.js#L4)*

___

### GetPackagedData

• `Const` **GetPackagedData**: [getPackagedData](_server_util_getpackageddata_.md#getpackageddata) = require('../util/getpackageddata')

*Defined in [server/tests/runtest.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/tests/runtest.js#L1)*

___

### RunAction

• `Const` **RunAction**: [runAction](_server_actions_runaction_index_.md#runaction) = require('../actions/runaction')

*Defined in [server/tests/runtest.js:2](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/tests/runtest.js#L2)*

## Functions

### runTest

▸ `Const`**runTest**(`db`: [Operations](_packages_fantastic_utils_db_types_d_.md#operations), `test`: string, `user`: [User](_packages_fantastic_utils_types_d_.md#user), `date`: number, `nodes`: number[], `parameters`: Object, `quest_id`: undefined \| number): Promise\<{ event_id: number ; results: ({ action: string = action\_path; filter: undefined \| false \| true = result.filter; node_id: any = row.node\_id; result: [Result](_server_actions_runaction_runfunction_types_d_.md#result)[] = result.results } \| { action: string = action\_path; node_id: any = row.node\_id; result: boolean = CheckResult(result.results, action.search, parameters) })[]  }>

*Defined in [server/tests/runtest.js:16](https://github.com/besimorhino/project-fantastic/blob/af5d0de/server/tests/runtest.js#L16)*

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`db` | [Operations](_packages_fantastic_utils_db_types_d_.md#operations) |  |
`test` | string |  |
`user` | [User](_packages_fantastic_utils_types_d_.md#user) | - |
`date` | number |  |
`nodes` | number[] | database IDs of nodes we're running the test on |
`parameters` | Object |  |
`quest_id` | undefined \| number | - |

**Returns:** Promise\<{ event_id: number ; results: ({ action: string = action\_path; filter: undefined \| false \| true = result.filter; node_id: any = row.node\_id; result: [Result](_server_actions_runaction_runfunction_types_d_.md#result)[] = result.results } \| { action: string = action\_path; node_id: any = row.node\_id; result: boolean = CheckResult(result.results, action.search, parameters) })[]  }>

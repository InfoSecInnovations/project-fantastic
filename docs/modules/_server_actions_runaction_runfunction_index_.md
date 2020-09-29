**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/actions/runaction/runfunction/index"

# Module: "server/actions/runaction/runfunction/index"

## Index

### Variables

* [GetFilter](_server_actions_runaction_runfunction_index_.md#getfilter)
* [ProcessResults](_server_actions_runaction_runfunction_index_.md#processresults)
* [PwshFunction](_server_actions_runaction_runfunction_index_.md#pwshfunction)
* [Result](_server_actions_runaction_runfunction_index_.md#result)

### Functions

* [runFunction](_server_actions_runaction_runfunction_index_.md#runfunction)

## Variables

### GetFilter

• `Const` **GetFilter**: [getFilter](_server_actions_runaction_runfunction_getfilter_.md#getfilter) = require('./getfilter')

*Defined in [server/actions/runaction/runfunction/index.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/index.js#L2)*

___

### ProcessResults

• `Const` **ProcessResults**: [processResults](_server_actions_runaction_runfunction_processresults_.md#processresults) = require('./processresults')

*Defined in [server/actions/runaction/runfunction/index.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/index.js#L4)*

___

### PwshFunction

• `Const` **PwshFunction**: [pwshFunction](_server_util_pwshfunction_.md#pwshfunction) = require('../../../util/pwshfunction')

*Defined in [server/actions/runaction/runfunction/index.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/index.js#L1)*

___

### Result

• `Const` **Result**: [result](_server_actions_runaction_runfunction_result_.md#result) = require('./result')

*Defined in [server/actions/runaction/runfunction/index.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/index.js#L3)*

## Functions

### runFunction

▸ `Const`**runFunction**(`action`: {}, `func`: string, `user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }, `hostname`: string, `data`: undefined \| {}): object

*Defined in [server/actions/runaction/runfunction/index.js:18](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/index.js#L18)*

Run a function from an action on the specified host

#### Parameters:

Name | Type |
------ | ------ |
`action` | {} |
`func` | string |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |
`hostname` | string |
`data` | undefined \| {} |

**Returns:** object

Name | Type |
------ | ------ |
`filter?` | undefined \| false \| true |
`results` | { data?: undefined \| {} ; followups?: Object\<string, {}> ; label: string ; pass: boolean  }[] |

{{
 results: import('./types').Result[],
 filter?: boolean
}}

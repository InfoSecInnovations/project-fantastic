**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "server/actions/runaction/runfunction/result"

# Module: "server/actions/runaction/runfunction/result"

## Index

### Variables

* [ExtractObjectValues](_server_actions_runaction_runfunction_result_.md#extractobjectvalues)
* [ExtractValue](_server_actions_runaction_runfunction_result_.md#extractvalue)
* [HasRole](_server_actions_runaction_runfunction_result_.md#hasrole)
* [IsValid](_server_actions_runaction_runfunction_result_.md#isvalid)

### Functions

* [result](_server_actions_runaction_runfunction_result_.md#result)

## Variables

### ExtractObjectValues

• `Const` **ExtractObjectValues**: [extractObjectValues](_server_util_extractobjectvalues_.md#extractobjectvalues) = require('../../../util/extractobjectvalues')

*Defined in [server/actions/runaction/runfunction/result.js:2](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/result.js#L2)*

___

### ExtractValue

• `Const` **ExtractValue**: [extractValue](_server_util_extractvalue_.md#extractvalue) = require('../../../util/extractvalue')

*Defined in [server/actions/runaction/runfunction/result.js:1](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/result.js#L1)*

___

### HasRole

• `Const` **HasRole**: [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole) = require('fantastic-utils/hasrole')

*Defined in [server/actions/runaction/runfunction/result.js:3](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/result.js#L3)*

___

### IsValid

• `Const` **IsValid**: [isValid](_packages_fantastic_utils_isvalid_.md#isvalid) = require('fantastic-utils/isvalid')

*Defined in [server/actions/runaction/runfunction/result.js:4](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/result.js#L4)*

## Functions

### result

▸ `Const`**result**(`result_data`: {}, `output`: string \| {}, `action`: {}, `user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }, `filter`: boolean): any

*Defined in [server/actions/runaction/runfunction/result.js:15](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/server/actions/runaction/runfunction/result.js#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`result_data` | {} |
`output` | string \| {} |
`action` | {} |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |
`filter` | boolean |

**Returns:** any

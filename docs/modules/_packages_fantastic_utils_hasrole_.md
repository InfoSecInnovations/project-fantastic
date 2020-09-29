**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-utils/hasrole"

# Module: "packages/fantastic-utils/hasrole"

## Index

### Functions

* [hasRole](_packages_fantastic_utils_hasrole_.md#hasrole)

## Functions

### hasRole

▸ `Const`**hasRole**(`user`: { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  }, `role`: \"user\" \| \"elevated\" \| \"admin\"): boolean

*Defined in [packages/fantastic-utils/hasrole.js:6](https://github.com/besimorhino/project-fantastic/blob/a9b4b41/packages/fantastic-utils/hasrole.js#L6)*

Check whether user has can perform actions requiring this role

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`user` | { role: [UserRole](_packages_fantastic_utils_types_d_.md#userrole) ; user_id: string \| number ; username: string  } |  |
`role` | \"user\" \| \"elevated\" \| \"admin\" |   |

**Returns:** boolean

**fantastic-server**

> [README](../README.md) / [Globals](../globals.md) / "packages/fantastic-utils/db/operations"

# Module: "packages/fantastic-utils/db/operations"

## Index

### Functions

* [all](_packages_fantastic_utils_db_operations_.md#all)
* [condition\_entry](_packages_fantastic_utils_db_operations_.md#condition_entry)
* [condition\_group](_packages_fantastic_utils_db_operations_.md#condition_group)
* [get](_packages_fantastic_utils_db_operations_.md#get)
* [group](_packages_fantastic_utils_db_operations_.md#group)
* [insert](_packages_fantastic_utils_db_operations_.md#insert)
* [order](_packages_fantastic_utils_db_operations_.md#order)
* [remove](_packages_fantastic_utils_db_operations_.md#remove)
* [run](_packages_fantastic_utils_db_operations_.md#run)
* [select](_packages_fantastic_utils_db_operations_.md#select)
* [update](_packages_fantastic_utils_db_operations_.md#update)
* [where](_packages_fantastic_utils_db_operations_.md#where)

## Functions

### all

▸ `Const`**all**(`query`: any): (Anonymous function)

*Defined in [packages/fantastic-utils/db/operations.js:129](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L129)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | any |

**Returns:** (Anonymous function)

___

### condition\_entry

▸ `Const`**condition_entry**(`v`: any, `compare`: any): { text: string = \`${v[0]} IS NULL\` } \| { text: string = \`${v[0]} ${compare} ?\`; values: any = v[1] }

*Defined in [packages/fantastic-utils/db/operations.js:5](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`v` | any |
`compare` | any |

**Returns:** { text: string = \`${v[0]} IS NULL\` } \| { text: string = \`${v[0]} ${compare} ?\`; values: any = v[1] }

___

### condition\_group

▸ `Const`**condition_group**(`group`: any): object

*Defined in [packages/fantastic-utils/db/operations.js:14](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`group` | any |

**Returns:** object

Name | Type |
------ | ------ |
`text` | any |
`values` | any |

___

### get

▸ `Const`**get**(`query`: any): (Anonymous function)

*Defined in [packages/fantastic-utils/db/operations.js:114](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L114)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | any |

**Returns:** (Anonymous function)

___

### group

▸ `Const`**group**(`group_by`: any): string

*Defined in [packages/fantastic-utils/db/operations.js:42](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`group_by` | any |

**Returns:** string

___

### insert

▸ `Const`**insert**(`table`: any, `row`: any): (Anonymous function)

*Defined in [packages/fantastic-utils/db/operations.js:47](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L47)*

#### Parameters:

Name | Type |
------ | ------ |
`table` | any |
`row` | any |

**Returns:** (Anonymous function)

___

### order

▸ `Const`**order**(`order_by`: any): string

*Defined in [packages/fantastic-utils/db/operations.js:32](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L32)*

#### Parameters:

Name | Type |
------ | ------ |
`order_by` | any |

**Returns:** string

___

### remove

▸ `Const`**remove**(`query`: any): (Anonymous function)

*Defined in [packages/fantastic-utils/db/operations.js:144](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L144)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | any |

**Returns:** (Anonymous function)

___

### run

▸ `Const`**run**(`queries`: any): (Anonymous function)

*Defined in [packages/fantastic-utils/db/operations.js:1](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L1)*

#### Parameters:

Name | Type |
------ | ------ |
`queries` | any |

**Returns:** (Anonymous function)

___

### select

▸ `Const`**select**(`query`: any): object

*Defined in [packages/fantastic-utils/db/operations.js:87](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L87)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | any |

**Returns:** object

Name | Type |
------ | ------ |
`text` | string |
`values` | any |

___

### update

▸ `Const`**update**(`query`: any): (Anonymous function)

*Defined in [packages/fantastic-utils/db/operations.js:66](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L66)*

#### Parameters:

Name | Type |
------ | ------ |
`query` | any |

**Returns:** (Anonymous function)

___

### where

▸ `Const`**where**(`conditions`: any): object

*Defined in [packages/fantastic-utils/db/operations.js:22](https://github.com/besimorhino/project-fantastic/blob/af5d0de/packages/fantastic-utils/db/operations.js#L22)*

#### Parameters:

Name | Type |
------ | ------ |
`conditions` | any |

**Returns:** object

Name | Type |
------ | ------ |
`text` | string |
`values` | any |

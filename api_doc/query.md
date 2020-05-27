Structure of the object expected by `packages/fantastic-utils/db/operations.js` functions `update`, `get`, `all` and `remove`

    {
      table,
      row: {name: value, ...}, // for update operations
      columns [name, ...], // for select operations
      conditions: {
        groups: [
          {
            columns: {name: value, ...} or [[column_a, value_a], [column_b, value_b] ...],
            combine: 'AND', 'OR',
            compare: '>', '<' etc.
          }
        ],
        combine: 'AND', 'OR'
      } or {
        columns: {name: value, ...} or [[column_a, value_a], [column_b, value_b] ...],
        combine: 'AND', 'OR',
        compare: '>', '<' etc.
      },
      order_by: name // sort by this column, ascending
      or
      [name, name...] // sort by these columns, ascending
      or
      {name: 'ASC', 'DESC', ...} // sort by each key using the value for ascending / descending
    }
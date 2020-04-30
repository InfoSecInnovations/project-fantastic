const run = queries => db => db.serialize(() => {
  queries.forEach(v => db.run(v, err => err && console.log(err.message)))
})

const format_value = v => {
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  if (typeof v === 'string') return `'${v}'`
  if (!v) return 'NULL' // types above this line can be falsy but valid
  if (Array.isArray(v)) return `(${v.map(format_value).join()})`
  return `\`"${v}"\``
}

const condition_entry = (v, compare) => {
  if (!compare) compare = '='
  const value = format_value(v[1])
  if (value === 'NULL' && compare === '=') return `${v[0]} IS NULL`
  return `${v[0]} ${compare} ${format_value(v[1])}`
}

const condition_group = group => Array.isArray(group.columns) ? 
  group.columns.map(v => condition_entry(v, group.compare)).join(` ${group.combine || 'AND'} `) :
  Object.entries(group.columns).map(v => condition_entry(v, group.compare)).join(` ${group.combine || 'AND'} `) 

const where = conditions => conditions ? `WHERE ${conditions.groups ? conditions.groups.map(v => condition_group(v)).join(` ${conditions.combine || 'AND'} `) : condition_group(conditions)}` : '' // TODO: filter out invalid values here, especially empty arrays

const condition_entry_new = (v, compare) => {
  if (!compare) compare = '='
  if ((typeof v[1] === 'undefined' || v[1] === null) && compare === '=') return {text: `$[v[0]] IS NULL`}
  if (Array.isArray(v[1])) {
    return {text: `${v[0]} ${compare} (${v[1].map(() => '?').join(', ')})`, values: v[1]}
  }
  return {text: `${v[0]} ${compare} ?`, values: v[1]}
}

const condition_group_new = group => {
  const groups = Array.isArray(group.columns) ? group.columns.map(v => condition_entry_new(v, group.compare)) : Object.entries(group.columns).map(v => condition_entry_new(v, group.compare))
  return {
    text: groups.map(v => v.text).join(` ${group.combine || 'AND'} `),
    values: groups.map(v => v.values).flat()
  }
}

const where_new = conditions => {
  if (!conditions) return {text: '', values: []} // TODO: filter out invalid values here, especially empty arrays
  const groups = conditions.groups ? conditions.groups.map(v => condition_group_new(v)) : [condition_group_new(conditions)]
  return {
    text: groups.map(v => v.text).join(` ${conditions.combine || 'AND'} `),
    values: groups.map(v => v.values).flat()
  }
}

const order = order_by => {
  if (!order_by) return ''
  const text = () => {
    if (Array.isArray(order_by)) return order_by.join()
    if (typeof order_by === 'object') return Object.entries(order_by).map(v => `${v[0]} ${v[1]}`).join()
    return order_by
  }
  return `ORDER BY ${text()}`
}

const insert = (table, row) =>
  db => new Promise(
    (resolve, reject) => db.run(
      `INSERT INTO ${table} ${row && Object.keys(row).length ? `(${Object.keys(row).join()})
      VALUES(${Object.values(row).map(format_value).join()})` : 'DEFAULT VALUES'}`,
      function (err) {
        if (err) return reject(err)
        resolve(this.lastID)
      }
    )
  )

const update_new = query =>
  db => new Promise(
    (resolve, reject) => {
      const row = Object.entries(query.row).filter(v => typeof v[1] !== 'undefined')
      const where_query = where_new(query.conditions)
      db.run(
        `UPDATE ${query.table}
        SET ${row.map(v => `${v[0]} = ?`).join(', ')}
        WHERE ${where_query.text};`,
        [
          ...row.map(v => v[1]),
          ...where_query.values
        ],
        function (err) {
          if (err) return reject(err)
          resolve()
        }
      )
    })

const select = query => `SELECT ${(query.columns && query.columns.length && query.columns.join()) || '*'} 
  FROM ${query.table}
  ${where(query.conditions)}
  ${order(query.order_by)}`

const get = query =>
  db => new Promise(
    (resolve, reject) => db.get(
      select(query), 
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      }
    )
  )

const all = query =>
  db => new Promise(
    (resolve, reject) => db.all(
      select(query), 
      (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      }
    )
  )

const remove = query => run([
  `DELETE FROM ${query.table}
  ${where(query.conditions)}`
])

module.exports = {insert, update: update_new, get, all, run, remove}
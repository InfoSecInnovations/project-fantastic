const SQLite3 = require('sqlite3').verbose()

const execute = func => new Promise(async (resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  const result = await func(db)
  db.close(err => err && reject(err) || resolve(result))
})

const run = queries => execute(db => db.serialize(() => {
  queries.forEach(v => db.run(v, err => err && console.log(err.message)))
}))

const format_value = v => {
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  if (typeof v === 'string') return `'${v}'`
  if (!v) return 'NULL' // types above this line can be falsy but valid
  if (Array.isArray(v)) return `(${v.map(format_value).join()})`
  return `'${v}'`
}

const condition_group = group => Array.isArray(group.columns) ? 
  group.columns.map(v => `${v[0]} ${group.compare || '='} ${v[1]}`).join(` ${group.combine || 'AND'} `) :
  Object.entries(group.columns).map(v => `${v[0]} ${group.compare || '='} ${format_value(v[1])}`).join(` ${group.combine || 'AND'} `) 

const where = conditions => conditions ? `WHERE ${conditions.groups ? conditions.groups.map(v => condition_group(v)).join(` ${conditions.combine || 'AND'} `) : condition_group(conditions)}` : '' // TODO: filter out invalid values here, especially empty arrays

const order = order_by => {
  if (!order_by) return ''
  const text = () => {
    if (Array.isArray(order_by)) return order_by.join()
    if (typeof order_by === 'object') return Object.entries(order_by).map(v => `${v[0]} ${v[1]}`).join()
    return order_by
  }
  return `ORDER BY ${text()}`
}

const insert = (table, row) => execute(
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
)

const update = query => execute(
  db => new Promise(
    (resolve, reject) => db.run(
      `UPDATE ${query.table}
      SET ${Object.entries(query.row).filter(v => typeof v[1] === 'number' || typeof v[1] === 'boolean' || typeof v[1] === 'string' || v[1]).map(v => `${v[0]} = ${format_value(v[1])}`)}
      ${where(query.conditions)}`,
      function (err) {
        if (err) return reject(err)
        resolve()
      }
    )
  )
)

const select = query => `SELECT ${(query.columns && query.columns.length && query.columns.join()) || '*'} 
  FROM ${query.table}
  ${where(query.conditions)}
  ${order(query.order_by)}`

const get = query => execute(
  db => new Promise(
    (resolve, reject) => db.get(
      select(query), 
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      }
    )
  )
)

const all = query => execute(
  db => new Promise(
    (resolve, reject) => db.all(
      select(query), 
      (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      }
    )
  )
)

const remove = query => run([
  `DELETE FROM ${query.table}
  ${where(query.conditions)}`
])

module.exports = {insert, update, get, all, run, remove}
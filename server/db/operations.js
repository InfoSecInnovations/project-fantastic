const SQLite3 = require('sqlite3').verbose()

const run = queries => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.serialize(() => {
    queries.forEach(v => db.run(v, err => err && console.log(err.message)))
  })
  db.close(err => err && reject(err) || resolve())
})

const format_value = v => typeof v === 'number' ? v : (v ? `'${v}'` : 'NULL')

const condition_group = group => Object.entries(group.columns).map(v => `${v[0]} ${group.compare || '='} ${format_value(v[1])}`).join(` ${group.combine || 'AND'} `)

const where = conditions => conditions ? `WHERE ${conditions.groups ? conditions.groups.map(v => condition_group(v)).join(` ${conditions.combine || 'AND'} `) : condition_group(conditions)}` : ''

const insert = (table, row) => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.run(
    `INSERT INTO ${table} ${row && Object.keys(row).length ? `(${Object.keys(row).join()})
    VALUES(${Object.values(row).map(format_value).join()})` : 'DEFAULT VALUES'}`,
    function (err) {
      if (err) return reject(err)
      resolve(this.lastID)
    }
  )
  db.close(err => err && console.log(err.message))
})

const update = query => run([
  `UPDATE ${query.table}
  SET ${Object.entries(query.row).filter(v => typeof v[1] === 'number' || v[1]).map(v => `${v[0]} = ${format_value(v[1])}`)}
  ${where(query.conditions)}` // checking the number type is important because 0 is falsy but we want to update it
])

const select = query => `SELECT ${(query.columns && query.columns.length && query.columns.join()) || '*'} 
  FROM ${query.table}
  ${where(query.conditions)}`

const get = query => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.get(select(query), (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
  db.close(err => err && console.error(err.message))
})

const all = query => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.all(select(query), (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
  db.close(err => err && console.error(err.message))
})

const remove = query => run([
  `DELETE FROM ${query.table}
  ${where(query.conditions)}`
])

module.exports = {insert, update, get, all, run, remove}
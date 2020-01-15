const SQLite3 = require('sqlite3').verbose()

const run = queries => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.serialize(() => {
    queries.forEach(v => db.run(v, err => err && console.log(err.message)))
  })
  db.close(err => err && reject(err) || resolve())
})

const format_value = v => typeof v === 'number' ? v : (v ? `'${v}'` : 'NULL')

const where = (match, match_operator = 'AND') => match ? `WHERE ${Object.entries(match).map(v => `${v[0]} = ${format_value(v[1])}`).join(` ${match_operator} `)}` : ''

const insert = (table, row) => run([
  `INSERT INTO ${table} (${Object.keys(row).join()})
  VALUES(${Object.values(row).map(format_value).join()})`
])

const update = (table, row, match, match_operator = 'AND') => run([
  `UPDATE ${table}
  SET ${Object.entries(row).filter(v => typeof v[1] === 'number' || v[1]).map(v => `${v[0]} = ${format_value(v[1])}`)}
  ${where(match, match_operator)}` // checking the number type is important because 0 is falsy but we want to update it
])

const select = (table, columns, match, match_operator = 'AND') => `SELECT ${(columns && columns.length && columns.join()) || '*'} 
  FROM ${table}
  ${where(match, match_operator)}`

const get = (table, columns, match, match_operator = 'AND') => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.get(select(table, columns, match, match_operator), (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
  db.close(err => err && console.error(err.message))
})

const all = (table, columns, match, match_operator = 'AND') => new Promise((resolve, reject) => {
  const db = new SQLite3.Database('./data.db', err => err && console.error(err.message))
  db.all(select(table, columns, match, match_operator), (err, row) => {
    if (err) reject(err)
    else resolve(row)
  })
  db.close(err => err && console.error(err.message))
})

module.exports = {insert, update, get, all, run}
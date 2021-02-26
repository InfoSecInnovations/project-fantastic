const SQLite3 = require('sqlite3')
const Operations = require('./operations')
const Transaction = require('./transaction')

const execute = (path, func, mode) => new Promise(async (resolve, reject) => {
  const db = new SQLite3.Database(path, mode, err => err && console.error(err.message))
  db.configure('busyTimeout', 1000000)
  const result = await func(db)
  db.close(err => err && reject(err) || resolve(result))
})

/**
 * Create a new database object to communicate with the database at the given path.
 * @param {string} path 
 * @returns {import('./types').DB} database object
 */
const init = path => ({
  ...Object.entries(Operations.write).reduce((result, v) => ({...result, [v[0]]: (...args) => execute(path, v[1].apply(null, args))}), {}),
  ...Object.entries(Operations.read).reduce((result, v) => ({...result, [v[0]]: (...args) => execute(path, v[1].apply(null, args), SQLite3.OPEN_READONLY)}), {}),
  transaction: mode => Transaction(path, mode),
  OPEN_READONLY: SQLite3.OPEN_READONLY,
  OPEN_READWRITE: SQLite3.OPEN_READWRITE,
  OPEN_CREATE: SQLite3.OPEN_CREATE,
  sqlite: (func, mode) => execute(path, func, mode)
})

module.exports = init
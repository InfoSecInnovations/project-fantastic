const SQLite3 = require('sqlite3')
const Operations = require('./operations')
const Transaction = require('./transaction')

const execute = (path, func) => new Promise(async (resolve, reject) => {
  const db = new SQLite3.Database(path, err => err && console.error(err.message))
  db.configure('busyTimeout', 100000)
  const result = await func(db)
  db.close(err => err && reject(err) || resolve(result))
})

const init = path => ({
  ...Object.entries(Operations).reduce((result, v) => ({...result, [v[0]]: (...args) => execute(path, v[1].apply(null, args))}), {}),
  transaction: () => Transaction(path)
})

module.exports = init
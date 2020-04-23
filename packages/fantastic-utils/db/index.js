const SQLite3 = require('sqlite3').verbose()
const Operations = require('./operations')

const execute = (path, func) => new Promise(async (resolve, reject) => {
  const db = new SQLite3.Database(path, err => err && console.error(err.message))
  const result = await func(db)
  db.close(err => err && reject(err) || resolve(result))
})

const init = path => Object.entries(Operations).reduce((result, v) => ({...result, [v[0]]: (...args) => execute(path, v[1].apply(null, args))}), {})

module.exports = init
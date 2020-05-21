const Operations = require('./operations')
const SQLite3 = require('sqlite3')

const transaction = path => new Promise((resolve, reject) => {
  const db = new SQLite3.Database(path, err => err && console.error(err.message))
  db.run('BEGIN TRANSACTION;', err => {
    if (err) return reject(err)
    return resolve({
      ...Object.entries(Operations).reduce((result, v) => ({...result, [v[0]]: (...args) => v[1].apply(null, args)(db)}), {}),
      close: () => {
        db.run('COMMIT;', err => {
          if (err) return console.log(`SQLite error: ${err.message}`)
          db.close()
        })
      }
    })
  })
})

module.exports = transaction
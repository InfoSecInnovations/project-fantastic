const Operations = require('./operations')
const SQLite3 = require('sqlite3')

const transaction = (path, mode) => new Promise((resolve, reject) => {
  const db = new SQLite3.Database(path, mode, err => err && console.error(err.message))
  db.configure('busyTimeout', 1000000)
  const transaction_type = mode === SQLite3.OPEN_READONLY ? '' : 'IMMEDIATE'
  db.run(`BEGIN ${transaction_type} TRANSACTION;`, err => {
    if (err) return reject(err)
    return resolve({
      ...Object.entries(Operations.write)
      .concat(Object.entries(Operations.read))
      .reduce((result, v) => ({...result, [v[0]]: (...args) => v[1].apply(null, args)(db)}), {}),
      sqlite: func => func(db),
      close: () => new Promise((resolve, reject) => {
        db.run('COMMIT;', err => {
          if (err) return reject(err)
          db.close(err => {
            if (err) return reject(err)
            resolve()
          })
        })
      })
    })
  })
})

module.exports = transaction
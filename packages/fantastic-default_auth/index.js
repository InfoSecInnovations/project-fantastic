const {run, get, insert} = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')
const FS = require('fs').promises
const Path = require('path')
const ParseQuery = require('fantastic-utils/parsequery')
const BCrypt = require('bcrypt')

run(Schema).catch(err => console.log(err.message))

const serve = (path, res) => {
  res.onAborted(() => res.aborted = true)
  FS.readFile(Path.join(__dirname, path))
  .then(file => res.end(file))
}

const salt_rounds = 10

const configure = app => {
  app.post('/auth', (res, req) => {
    res.onAborted(() => res.aborted = true)
    let buffer
    res.onData((data, isLast) => {
      let chunk = Buffer.from(data)
      buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk])
      if (isLast) {
        const json = ParseQuery(buffer.toString())
        if (json.login) {
          get({table: 'users', conditions: {columns: {username: json.username}}})
          .then(row => {
            if (!row) return res.end('username or password was invalid! TODO: redirect to auth page with this message') // TODO: protect against timing attacks from no result vs result+compare hash?
            BCrypt.compare(json.password, row.password)
            .then(compare => {
              if (compare) return res.end('login successful! TODO: redirect to client with appropriate cookies')
              return res.end('username or password was invalid! TODO: redirect to auth page with this message')
            })
          })
        }
        if (json.register){
          get({table: 'users', columns: ['user_id'], conditions: {columns: {username: json.username}}})
          .then(row => {
            if(row) {
              res.end('user already exists or username is invalid! TODO: redirect to auth page with this message')
            }
            else {
              BCrypt.hash(json.password, salt_rounds)
              .then(hash => insert('users', {username: json.username, password: hash}))
              .then(() => res.end('new user created! TODO: redirect to client with appropriate cookies'))
            }
          })

        }
      }
    })
  })
}

const default_route = (res, req) => serve('auth.html', res)

const verify = id => {
  // TODO: check database
  return 'invalid'
}

module.exports = {default_route, configure, verify}
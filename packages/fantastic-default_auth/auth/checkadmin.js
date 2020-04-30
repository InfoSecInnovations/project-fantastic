const GetCookie = require('fantastic-utils/getcookie')
const GetHTTPData = require('fantastic-utils/gethttpdata')
const {get} = require('fantastic-utils/db')(require('../path'))

const failed_login = 'you must be logged in as an administrator!'

const checkAdmin = (res, req) => new Promise((resolve, reject) => {
  const header = req.getHeader('cookie')
  const admin_id = GetCookie(header, 'admin_id')
  if (!admin_id) {
    reject()
    return res.end(JSON.stringify({error: failed_login}))
  }
  GetHTTPData(res)
  .then(data => {
    get({table: 'users', columns: ['user_id'], conditions: {columns: {admin_session_id: admin_id}}})
    .then(row => {
      if (!row) {
        reject()
        return res.end(JSON.stringify({error: failed_login}))
      }
      resolve(data)
    })
  })
})

module.exports = checkAdmin
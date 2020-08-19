const GetHTTPData = require('fantastic-utils/gethttpdata')
const ParseQuery = require('fantastic-utils/parsequery')
const ActiveDirectory = require('../activedirectory')
const GenerateID = require('fantastic-utils/generateid')
const {get, update, insert} = require('../db')

const login = (res, req) => {
  res.onAborted(() => res.aborted = true)
  GetHTTPData(res)
  .then(async data => {
    const json = ParseQuery(data)
    const ad = await ActiveDirectory()
    try {
      const auth = await ad.authenticate(json.username, json.password)
      if (auth) {
        const split = json.username.split('\\')
        const username = split[split.length - 1]
        const session_id = await GenerateID()
        const row = await get({table: 'users', columns: ['user_id'], conditions: {columns: {username}}})
        if (row) await update({table: 'users', row: {session_id}, conditions: {columns: {username}}})
        else await insert('users', {username, session_id})
        res.writeStatus('302 Found')
        res.writeHeader('Location', '/')
        res.writeHeader('Set-Cookie', `session_id=${session_id}; Secure; HttpOnly; Path=/;`)
        res.end()
      }
      else {
        // TODO: send error cookie
        res.end()
      }
    }
    catch(err) {
      res.end()
      return console.log(`Active Directory authentication error: ${JSON.stringify(err)}`)
    }
  })
}

module.exports = login
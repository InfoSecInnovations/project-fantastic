const CheckAdmin = require('./checkadmin')
const DeleteAccount = require('../accounts/deleteaccount')

const deleteAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(async result => {
    await DeleteAccount(result.data)
    res.end()
  })
  .catch(() => {})
}

module.exports = deleteAccount
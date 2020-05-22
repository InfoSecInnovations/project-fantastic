const CheckAdmin = require('./checkadmin')
const DeleteAccount = require('../accounts/deleteaccount')

const deleteAccount = (res, req) => {
  res.onAborted(() => res.aborted = true)
  CheckAdmin(res, req)
  .then(async result => {
    try {
      await DeleteAccount(result.data)
    }
    catch(err) {
      if (err.last_admin) return res.end(JSON.stringify({error: 'Deleting this account would mean that there would no longer be any admin accounts!'}))
    }
    res.end()
  })
  .catch(() => {})
}

module.exports = deleteAccount
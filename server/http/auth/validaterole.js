const Auth = require('./index')
const HasRole = require('./hasrole')

const validateRole = (res, req, role) => Auth(res, req)
  .then(user => HasRole(user, role))

module.exports = validateRole
const Auth = require('./index')
const HasRole = require('fantastic-utils/hasrole')

const validateRole = (header, role) => Auth(header)
  .then(user => HasRole(user, role))

module.exports = validateRole
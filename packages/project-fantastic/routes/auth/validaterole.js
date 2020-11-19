const Auth = require('./index')
const HasRole = require('@infosecinnovations/fantastic-utils/hasrole')

const validateRole = (auth_module, header, role) => Auth(auth_module, header)
  .then(user => HasRole(user, role))

module.exports = validateRole
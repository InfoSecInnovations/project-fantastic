const FS = require('fs-extra')

const serviceRemove = async () => FS.remove('ad-auth.cred')

module.exports = serviceRemove
const {init} = require('./db')

const defaultGroups = {
  "user": "fantastic-user",
  "elevated": "fantastic-elevated",
  "admin": "fantastic-admin"
}

const configure = async () => {
  init()

  // TODO: ask for AD domain if not configured

  // TODO: ask for AD groups if none are present
}

module.exports = configure
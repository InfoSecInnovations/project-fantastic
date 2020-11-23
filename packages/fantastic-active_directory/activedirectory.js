const ActiveDirectory = require('activedirectory2').promiseWrapper
const GetConfig = require('./utils/getconfig')

const activeDirectory = (username, password) => GetConfig()
.then(res => new ActiveDirectory({...res.credentials, username, password}))

module.exports = activeDirectory
const ActiveDirectory = require('activedirectory2').promiseWrapper
const GetConfig = require('./utils/getconfig')

const activeDirectory = () => GetConfig()
.then(res => new ActiveDirectory(JSON.parse(res).credentials))

module.exports = activeDirectory
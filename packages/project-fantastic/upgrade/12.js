const fs = require('fs-extra')
const {init} = require('../db')

const upgrade = () => Promise.all([
  fs.remove('./data.db'),
  fs.remove('./data.db-shm'),
  fs.remove('./data.db-wal')
]).then(() => init())

module.exports = upgrade


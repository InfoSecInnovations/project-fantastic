const fs = require('fs-extra')
const {init} = require('../db')

const upgrade = () => Promise.all([
  fs.remove('./data.db'),
  fs.remove('./data.db-shm'),
  fs.remove('./data.db-wal')
]).then(() => init())
.then(() => console.log('Version 12 resets the database because the schema is too different.'))

module.exports = upgrade


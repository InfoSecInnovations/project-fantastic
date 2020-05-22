const db = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')

const init = () => db.run(Schema).catch(err => console.log(err.message))

module.exports = {
  ...db,
  init
}
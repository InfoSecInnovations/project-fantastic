const db = require('@infosecinnovations/fantastic-db')(require('./path'))
const Schema = require('./schema')

const init = () => db.run(Schema).catch(err => console.log(err.message))

module.exports = {
  ...db,
  init
}
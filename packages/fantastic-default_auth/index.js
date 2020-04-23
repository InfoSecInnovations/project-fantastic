const {run} = require('fantastic-utils/db')(require('./path'))
const Schema = require('./schema')

run(Schema).catch(err => console.log(err.message))

const auth = req => 'user' // TODO: actual authentication

module.exports = auth
const {run} = require('./operations')
const Schema = require('./schema')

run(Schema).catch(err => console.log(err.message))

module.exports = {addConnections: require('./addconnections'), addNodes: require('./addnodes'), getNodes: require('./getnodes')}
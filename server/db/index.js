const {run} = require('./operations')
const Schema = require('./schema')

const init = () => run(Schema).catch(err => console.log(err.message))

module.exports = {
  init, 
  addConnections: require('./addconnections'), 
  addNodes: require('./addnodes'), 
  getNodes: require('./getnodes'), 
  updateNode: require('./updatenode'), 
  addMacs: require('./addmacs')
}
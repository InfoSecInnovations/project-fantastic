const operations = require('./operations')
const Schema = require('./schema')

/**
 * @typedef {{
  *  macs: ?{mac: string, vendor: string}[],
  *  ips: ?string[],
  *  hostname: ?string,
  *  os: ?string,
  *  important: boolean,
  *  access: 'local' | 'remote' | 'none'
  * }} Node
  */

const init = () => operations.run(Schema).catch(err => console.log(err.message))

module.exports = {
  init, 
  addConnections: require('./addconnections'), 
  addNodes: require('./addnodes'), 
  getNodes: require('./getnodes'), 
  updateNode: require('./updatenode'), 
  addMacs: require('./addmacs'),
  ...operations
}
const ParseXML = require('xml2js').parseStringPromise
const FS = require('fs').promises

const traverse = (root, path) => {
  const split = path.split('.')
  let node = root
  for (const s of split) {
    node = node[s]
    if (Array.isArray(node)) {
      node = node[0]
    }
    if (typeof node === 'undefined') return
  }
  return node
}

const xml = async command => await FS.readFile(command.run.read_xml.file)
  .then(ParseXML)
  .then(res => {    
    const root = command.run.read_xml.root.split('.').reduce((result, v) => result[v], res)
    return root.map(v => Object.entries(command.run.result).reduce((result, r) => {
      if (typeof r[1] === 'string') {
        const value = traverse(v, r[1])
        if (typeof value !== 'undefined') result[r[0]] = value
      }
      if (typeof r[1] === 'object') {
        if (r[1].bool) {
          result[r[0]] = Object.entries(r[1].bool).every(b => traverse(v, b[0]) == b[1])
        }
        // TODO: array
      }
      return result
    }, {}))
  })  

module.exports = xml
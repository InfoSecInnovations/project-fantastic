const ParseXML = require('xml2js').parseStringPromise
const FS = require('fs').promises

const traverse = (root, path) => {
  if (path === '') return root
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

const get_object = (root, obj) => {
  if (typeof obj === 'string') return traverse(root, obj)
  return Object.entries(obj).reduce((result, r) => {
    if (typeof r[1] === 'string') {
      const value = traverse(root, r[1])
      if (typeof value !== 'undefined') result[r[0]] = value
    }
    if (typeof r[1] === 'object') {
      if (r[1].bool) {
        result[r[0]] = Object.entries(r[1].bool).every(b => traverse(root, b[0]) == b[1])
      }
      if (r[1].array) {
        const last = r[1].array.lastIndexOf('.')
        const path = last >= 0 ? r[1].array.slice(0, last) : ''
        const array_key = last >= 0 ? r[1].array.slice(last + 1) : r[1].array
        const array_root = traverse(root, path)
        if (array_root) {
          const array = traverse(root, path)[array_key]
          if (Array.isArray(array)){ 
            const filtered = array
            .filter(a => !r[1].filter || Object.entries(r[1].filter)
              .every(f => traverse(a, f[0]) == f[1]))
            .map(a => get_object(a, r[1].result))
            .filter(a => typeof a !== 'undefined' && (typeof a !== 'object' || Object.entries(a).length))
            if (filtered.length) result[r[0]] = filtered
          }
        }
      }
    }
    if (typeof r[1] === 'boolean') result[r[0]] = r[1]
    return result
  }, {})
}

const xml = async command => await FS.readFile(command.run.read_xml.file)
  .then(ParseXML)
  .then(res => {    
    const root = command.run.read_xml.root.split('.').reduce((result, v) => result[v], res)
    return root.map(v => get_object(v, command.run.result))
  })  

module.exports = xml
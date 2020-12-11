const FS = require('fs-extra')
const Path = require('path')

export default (state, action, send) => FS.readJSON(action.path)
  .then(json => {
    json.pathData.forEach(p => send({type: 'load_module', module: Path.resolve(action.path, p)}))
    Object.entries(json.nodeData).forEach(e => {
      send({type: 'editor_node', id: e[0], node: e[1]})
      // TODO: jsPlumb connections
    })
  })
const FS = require('fs-extra')
const Path = require('path')
import LoadModule from './loadmodule'
import QuestConfig from '../defaults/questconfig'

export default (state, action, send) => FS.readJSON(action.path)
  .then(async json => {
    await Promise.all(json.pathData.map(p => LoadModule(state, {module: Path.resolve(action.path, p)}, send))) // we want the modules to be loaded before doing the other stuff
    Object.entries(json.nodeData).forEach(e => { // load all nodes
      send({type: 'editor_node', id: e[0], node: e[1]})
    })
    Object.entries(json.nodeData).forEach(e => { // establish connections
      e[1].targets.forEach(target => state.editor.jsplumb.connect({source: e[0], target}))
    })
    state.editor.config = {...QuestConfig(), ...json.questConfig}
    send({type: 'save_file', name: Path.parse(action.path).base})
  })
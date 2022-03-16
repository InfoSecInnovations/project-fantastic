const FS = require('fs-extra')
const Path = require('path')
import ModuleFromKey from '../util/modulefromkey'

export default (state, action, send) => {
  const {jsplumb: instance, nodes} = state.storyTree
  const elements = instance.getManagedElements()
  const nodeData = Object.entries(elements).reduce((result, e) => ({...result, [e[0]]: {
    key: nodes[e[0]].key,
    type: nodes[e[0]].type,
    customDescription: nodes[e[0]].customDescription,
    position: {
      x: parseInt(e[1].el.style.left.replace('px', '')),
      y: parseInt(e[1].el.style.top.replace('px', ''))
    },
    targets: instance.getConnections({source: e[0]}).map(c => c.targetId),
    parameters: nodes[e[0]].parameters
  }}), {})
  const pathData = Object.entries(elements).reduce((result, e) => {
    const module = ModuleFromKey(state, nodes[e[0]].key)
    const path = Path.relative(action.path, module.path)
    if (!result.includes(path)) result.push(path)
    return result
  }, [])
  FS.writeJSON(action.path, {
    pathData, 
    nodeData, 
    questConfig: state.storyTree.json, 
    description: state.storyTree.json.description, 
    name: state.storyTree.json.name,
    id: state.storyTree.questId
  }, {spaces: '\t'})
  send({type: 'save_file', name: Path.parse(action.path).base})
}
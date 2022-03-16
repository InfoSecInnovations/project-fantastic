import itemcollections from '../util/itemcollections'
import ModuleFromKey from '../util/modulefromkey'
const FS = require('fs-extra')
const Path = require('path')

export default (state, action, send) => {
  const dir = state.modules[state.selectedModule].path
  const itemDir = Path.join(dir, itemcollections[action.itemType])
  FS.ensureDir(itemDir)
  .then(() => {
    let json = state[action.itemType].json
    if (action.itemType == 'storyTree') {
      const instance = state.storyTree.jsplumb
      const elements = instance.getManagedElements()
      const nodes = json.nodeData
      const nodeData = Object.entries(elements).reduce((result, e) => ({...result, [e[0]]: {
        ...nodes[e[0]],
        position: {
          x: parseInt(e[1].el.style.left.replace('px', '')),
          y: parseInt(e[1].el.style.top.replace('px', ''))
        },
        targets: instance.getConnections({source: e[0]}).map(c => c.targetId)
      }}), {})
      json = {
        ...json,
        nodeData
      }
      send({type: 'set_item', itemType: action.itemType, json, filename: state[action.itemType].filename})
    }
    FS.writeJSON(Path.join(itemDir, `${state[action.itemType].filename}.json`), json, {spaces: '\t'})
  })
}
import {h} from 'snabbdom/h'

const draggableNode = node => h('li.node', {
  attrs: { draggable: 'true' },
  on: { dragstart: e => e.dataTransfer.setData('fantastic-data', JSON.stringify(node)) }
}, h('div.node-label', node.data.name))

const nodeList = (state, module, type) => Object.entries(module[type])
  .filter(e => !Object.values(state.editor.nodes).find(node => node.type == type && node.key == e[0]))
  .map(e => draggableNode({ key: e[0], data: e[1], type }))

export default (state, send) => state.modules ? state.modules.map(module => [
    h('h2', module.name),
    h('div.sidebar-columns', [
      h('div.column center', [
        h('h3', 'Actions'),
        h('ul', nodeList(state, module, 'actions'))
      ]),
      h('div.column center', [
        h('h3', 'Tests'),
        h('ul', nodeList(state, module, 'tests'))
      ])
    ])
  ]).flat() : undefined
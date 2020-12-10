import {h} from 'snabbdom/h'

const draggableNode = data => h('li.node', {
  attrs: { draggable: 'true' },
  on: { dragstart: e => e.dataTransfer.setData('fantastic-data', JSON.stringify(data)) }
}, h('div.node-label', data.value.name))

const nodeList = (state, module, type) => Object.entries(module[type])
  .filter(e => !Object.values(state.editor.nodes).find(node => node.type == type && node.key == e[0]))
  .map(e => draggableNode({ key: e[0], value: e[1], type }))

export default (state, send) => [
  h('div.button', {on: {click: e => send({type: 'load_module_menu', enabled: true})}}, 'Load module'),
  ...(state.modules ? state.modules.map(module => [
    h('h2', module.name),
    h('div.sidebar-columns', [
      h('div.column', [
        h('h3', 'Actions'),
        h('ul', nodeList(state, module, 'actions'))
      ]),
      h('div.column', [
        h('h3', 'Tests'),
        h('ul', nodeList(state, module, 'tests'))
      ])
    ])
  ]) : []).flat()
]
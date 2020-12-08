import {h} from 'snabbdom/h'

export default (state, send) => [
  h('div.button', {on: {click: e => send({type: 'load_module_menu', enabled: true})}}, 'Load module'),
  ...(state.modules ? state.modules.map(module => [
    h('h2', module.name),
    h('div.sidebar-columns', [
      h('div.column', [
        h('h3', 'Actions'),
        h('ul', Object.entries(module.actions).map(action => h('li.node', h('div.node-label', action[1].name))))
      ]),
      h('div.column', [
        h('h3', 'Tests'),
        h('ul', Object.entries(module.tests).map(test => h('li.node', h('div.node-label', test[1].name))))
      ])
    ])
  ]) : []).flat()
]
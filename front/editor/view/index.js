import {h} from 'snabbdom/h'
import StoryTree from './storytree'

const content = (state, send) => {
  if (!state.mode || state.mode == 'menu') return h('div#menu.column center content', [
    h('h1', 'Fantastic Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'storytree'})}}, 'Story Tree Editor')
  ])
  if (state.mode == 'storytree') return StoryTree(state, send)
}

const body = (state, send) => h('div#main-container', [
  h('div#modules', [
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'menu'})}}, 'Main Menu'),
    h('input', {
      attrs: { 
        id: 'load-module-file-input',
        type: 'file',
        nwdirectory: true
      },
      on: { change: e => {
        send({type: 'load_module', module: e.target.value})
        e.target.value = ''
      }},
      style: {display: 'none'}
    }),
    h('label.button', {attrs: {for: 'load-module-file-input'}}, 'Load Module'),
    ...Object.values(state.modules).map(module => h('div.module', [
      h('div', module.name),
      h('div.module-button', {
        on: {click: e => send({type: 'unload_module', module: module.name})}
      }, 'X')
    ]))
  ]),
  content(state, send)
])

export default (state, send) => h('body', body(state, send))
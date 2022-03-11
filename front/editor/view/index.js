import {h} from 'snabbdom/h'
import StoryTree from './storytree'
import Config from './config'
import Module from './module'
import Action from './action'
import NewModule from './newmodule'
import Scan from './scan'

const content = (state, send) => [
  h('div#menu.column center content', {class: {hidden: state.mode && state.mode != 'menu'}}, [
    h('h1', 'Fantastic Tools'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'install'})}}, 'Installation Manager'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'config'})}}, 'Config Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'storytree'})}}, 'Story Tree Editor'),
    h('div', Object.values(state.modules).length == 0 ? 'Load or create a module on the left to get started with content creation.' : 'Select a module on the left to edit its content.')
  ]),
  Action(state, send),
  StoryTree(state, send),
  Config(state, send),
  Module(state, send),
  NewModule(state, send),
  Scan(state, send)
]

const body = (state, send) => h('div#main-container', [
  h('div#modules.editor-scroll', [
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
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'new_module'})}}, 'New Module'),
    ...Object.values(state.modules).map(module => h('div.module', [
      h('div.module-link', {
        on: { click: e => {
          send({type: 'mode', mode: 'module'})
          send({type: 'select_module', module: module.name})
        }}
      }, (module.info && module.info.name) || module.name),
      h('div.mini-button', {
        on: {click: e => send({type: 'unload_module', module: module.name})}
      }, 'X')
    ]))
  ]),
  ...content(state, send)
])

export default (state, send) => h('body', body(state, send))
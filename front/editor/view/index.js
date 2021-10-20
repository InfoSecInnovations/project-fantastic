import {h} from 'snabbdom/h'
import StoryTree from './storytree'
import Config from './config'

const content = (state, send) => [
  h('div#menu.column center content', {class: {hidden: state.mode && state.mode != 'menu'}}, [
    h('h1', 'Fantastic Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'config'})}}, 'Config Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'action'})}}, 'Action Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'scan'})}}, 'Scan Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'command'})}}, 'Host Data Command Editor'),
    h('div.button', {on: {click: e => send({type: 'mode', mode: 'storytree'})}}, 'Story Tree Editor')
  ]),
  StoryTree(state, send),
  Config(state, send)
]

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
  ...content(state, send)
])

export default (state, send) => h('body', body(state, send))
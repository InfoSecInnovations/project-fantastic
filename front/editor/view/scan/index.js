import {h} from 'snabbdom/h'
import Editor from './editor'
import Wizard from './wizard'
import JSONEditor from '../common/jsoneditor'

export default (state, send) => h('div#scan.content', {class: {hidden: state.mode != 'scan'}}, [
  h('div.menu-bar panel', [
    h('h2', 'Scan Editor'),
    h('div.tabs', [
      h('div.button', {
        class: {disabled: state.scan.editorMode == 'wizard' || !state.scan.editorMode},
        on: {click: e => send({type: 'editor_mode', itemType: 'scan', mode: 'wizard'})}
      }, 'Wizard'),
      h('div.button', {
        class: {disabled: state.scan.editorMode == 'editor'},
        on: {click: e => send({type: 'editor_mode', itemType: 'scan', mode: 'editor'})}
      }, 'Advanced'),
      h('div.button', {
        class: {disabled: state.scan.editorMode == 'raw'},
        on: {click: e => send({type: 'editor_mode', itemType: 'scan', mode: 'raw'})}
      }, 'JSON'),
    ]),
    h('div.item', [
      h('div.button', {
        on: {click: e => send({type: 'save_scan'})}
      }, 'Save'), 
      h('div.button', {
        on: {click: e => send({type: 'discard_scan', prompt: true})}
      }, 'Discard Changes')
    ]), 
    h('h2', state.scan.json.name || state.scan.filename)
  ]),
  state.scan.editorMode == 'raw' ? JSONEditor(state, send, 'scan', `${state.selectedModule}-${state.scan.filename}`, state.scan.json) :
  state.scan.editorMode == 'editor' ? Editor(state, send) : 
  Wizard(state, send)
])
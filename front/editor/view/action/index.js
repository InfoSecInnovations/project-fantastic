import {h} from 'snabbdom/h'
import Editor from './editor'
import Wizard from './wizard'
import JSONEditor from '../common/jsoneditor'

export default (state, send) => h('div#action.content', {class: {hidden: state.mode != 'action'}}, [
  h('div.menu-bar panel', [
    h('h2', 'Action Editor'),
    h('div.tabs', [
      h('div.button', {
        class: {disabled: state.action.editorMode == 'wizard' || !state.action.editorMode},
        on: {click: e => send({type: 'editor_mode', itemType: 'action', mode: 'wizard'})}
      }, 'Wizard'),
      h('div.button', {
        class: {disabled: state.action.editorMode == 'editor'},
        on: {click: e => send({type: 'editor_mode', itemType: 'action', mode: 'editor'})}
      }, 'Advanced'),
      h('div.button', {
        class: {disabled: state.action.editorMode == 'raw'},
        on: {click: e => send({type: 'editor_mode', itemType: 'action', mode: 'raw'})}
      }, 'JSON'),
    ]),
    h('div.item', [
      h('div.button', {
        on: {click: e => send({type: 'save_action'})}
      }, 'Save'), 
      h('div.button', {
        on: {click: e => send({type: 'discard_action', prompt: true})}
      }, 'Discard Changes')
    ]), 
    h('h2', state.action.json.name || state.action.filename)
  ]),
  state.action.editorMode == 'raw' ? JSONEditor(state, send, 'action', `${state.selectedModule}-${state.action.filename}`, state.action.json) :
  state.action.editorMode == 'editor' ? Editor(state, send) : 
  Wizard(state, send)
])
import {h} from 'snabbdom/h'
import Editor from './editor'
import Wizard from './wizard'
import Raw from './raw'

export default (state, send) => h('div#action.content', {class: {hidden: state.mode != 'action'}}, [
  h('div.menu-bar panel', [
    h('h2', 'Action Editor'),
    h('div.tabs', [
      h('div.button', {
        on: {click: e => send({type: 'action_editor_mode', mode: 'wizard'})}
      }, 'Wizard'),
      h('div.button', {
        on: {click: e => send({type: 'action_editor_mode', mode: 'editor'})}
      }, 'Advanced'),
      h('div.button', {
        on: {click: e => send({type: 'action_editor_mode', mode: 'raw'})}
      }, 'JSON'),
    ]),
    h('div.button', {
      on: {click: e => send({type: 'save_action'})}
    }, 'Save'), 
    h('div.button', {
      on: {click: e => send({type: 'discard_action'})}
    }, 'Discard Changes'), 
    h('h2', state.action.json.name || state.action.filename)
  ]),
  state.actionEditorMode == 'raw' ? Raw(state, send) :
  state.actionEditorMode == 'editor' ? Editor(state, send) : 
  Wizard(state, send)

])
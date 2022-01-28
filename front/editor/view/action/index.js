import {h} from 'snabbdom/h'
import Editor from './editor'
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/continuecomment.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/display/autorefresh.js'

let cmInstance

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
  state.actionEditorMode == 'raw' ? h('textarea.editor', {
    hook: {
      insert: vnode => {
        cmInstance = CodeMirror.fromTextArea(vnode.elm, {
          matchBrackets: true,
          autoCloseBrackets: true,
          autoRefresh: true,
          mode: "application/ld+json",
          lineWrapping: true
        })
        cmInstance.on('change', () => send({type: 'update_action', json: JSON.parse(cmInstance.doc.getValue())}))
      },
      destroy: vnode => cmInstance.getWrapperElement().remove()
    },
    key: `json-editor${state.selectedModule}-${state.action.filename}`
  }, JSON.stringify(state.action.json, null, '\t')) : 
  state.actionEditorMode == 'editor' ? Editor(state, send) : 
  h('div', 'TODO: yer a wizard Harry')

])
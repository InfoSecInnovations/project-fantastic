import {h} from 'snabbdom/h'
import Editor from './editor'
import Wizard from './wizard'
import JSONEditor from '../common/jsoneditor'
import EditorMenuBar from '../common/editormenubar'

export default (state, send) => h('div#action.content', {class: {hidden: state.mode != 'action'}}, [
  EditorMenuBar(state, send, 'action', 'Action Editor'),
  state.action.editorMode == 'raw' ? JSONEditor(state, send, 'action', `${state.selectedModule}-${state.action.filename}`, state.action.json) :
  state.action.editorMode == 'editor' ? Editor(state, send) : 
  Wizard(state, send)
])
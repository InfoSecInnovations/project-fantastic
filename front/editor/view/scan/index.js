import {h} from 'snabbdom/h'
import Editor from './editor'
import Wizard from './wizard'
import JSONEditor from '../common/jsoneditor'
import EditorMenuBar from '../common/editormenubar'

export default (state, send) => h('div#scan.content', {class: {hidden: state.mode != 'scan'}}, [
  EditorMenuBar(state, send, 'scan', 'Scan Editor'),
  state.scan.editorMode == 'raw' ? JSONEditor(state, send, 'scan', `${state.selectedModule}-${state.scan.filename}`, state.scan.json) :
  state.scan.editorMode == 'editor' ? Editor(state, send) : 
  Wizard(state, send)
])
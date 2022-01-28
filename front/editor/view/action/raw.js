import {h} from 'snabbdom/h'
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/continuecomment.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/display/autorefresh.js'

let cmInstance

export default (state, send) => h('textarea.editor', {
  hook: {
    insert: vnode => {
      cmInstance = CodeMirror.fromTextArea(vnode.elm, {
        matchBrackets: true,
        autoCloseBrackets: true,
        autoRefresh: true,
        mode: "application/ld+json",
        lineWrapping: true,
        tabSize: 2,
        theme: 'base16-dark',
        lineNumbers: true
      })
      cmInstance.on('change', () => send({type: 'update_action', json: JSON.parse(cmInstance.doc.getValue())}))
    },
    destroy: vnode => cmInstance.getWrapperElement().remove()
  },
  key: `json-editor${state.selectedModule}-${state.action.filename}`
}, JSON.stringify(state.action.json, null, '\t'))
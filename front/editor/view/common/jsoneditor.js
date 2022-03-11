import {h} from 'snabbdom/h'
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/continuecomment.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/display/autorefresh.js'

const instances = {}

export default (state, send, itemType, id, json) => h('textarea.editor', {
  hook: {
    insert: vnode => {
      instances[id] = CodeMirror.fromTextArea(vnode.elm, {
        matchBrackets: true,
        autoCloseBrackets: true,
        autoRefresh: true,
        mode: "application/ld+json",
        lineWrapping: true,
        tabSize: 2,
        theme: 'base16-dark',
        lineNumbers: true
      })
      instances[id].on('change', () => send({type: 'update_item', itemType, json: JSON.parse(instances[id].doc.getValue())}))
    },
    destroy: vnode => instances[id].getWrapperElement().remove()
  },
  key: `json-editor-${id}`
}, JSON.stringify(json, null, '\t'))
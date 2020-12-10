import {h} from 'snabbdom/h'

export default (state, send) => {
  if (!state.editor.selected) return [h('div', 'TODO: story quest config')]
  const node = state.editor.nodes[state.editor.selected]
  return [
    h('h2', node.data.name),
    h('div.column', [
      h('label.label', {attrs: {for: 'node-description-editor'}}, 'Custom Description'),
      h('textarea#node-description-editor', {
        attrs: {rows: 7},
        on: {input: e => send({type: 'set_custom_description', id: state.editor.selected, description: e.target.value})}
      }, node.customDescription || (node.data.quest && node.data.quest.explanation) || '')
    ]),
    h('div.column', [
      h('div.label', 'Description'),
      h('div', node.data.description || '')
    ])
  ]
}
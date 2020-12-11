import {h} from 'snabbdom/h'

export default (state, send) => {
  if (!state.editor.selected) return [h('div', 'TODO: story quest config')]
  const node = state.editor.nodes[state.editor.selected]
  const sliceIndex = node.key.lastIndexOf('/')
  const key = node.key.slice(sliceIndex + 1)
  const module = state.modules[node.key.slice(0, sliceIndex)]
  if (!module) return
  const data = module[node.type][key]
  return [
    h('h2', data.name),
    h('div.column', [
      h('label.label', {attrs: {for: 'node-description-editor'}}, 'Custom Description'),
      h('textarea#node-description-editor', {
        attrs: {rows: 7},
        on: {input: e => send({type: 'set_custom_description', id: state.editor.selected, description: e.target.value})}
      }, node.customDescription || (data.quest && data.quest.explanation) || '')
    ]),
    h('div.column', [
      h('div.label', 'Description'),
      h('div', data.description || '')
    ])
  ]
}
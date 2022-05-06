import {h} from 'snabbdom/h'

export default (state, send) =>   h('div.column', [
  h('div.row', [
    h('label.label', { attrs: {for: `${state.scan.filename}-scan-quest-explanation`}}, 'Explanation'),
    h('input', {
      attrs: {id: `${state.scan.filename}-scan-quest-explanation`},
      props: {value: state.scan.json.quest.explanation || ''},
      on: {input: e => send({type: 'scan_quest_explanation', value: e.target.value})}
    })
  ]),
  h('div.label', "This information will be appended to the scan's description to explain why you might want to do this check.")
])
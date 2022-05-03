import {h} from 'snabbdom/h'

export default {
  title: 'Set Description',
  description: "It's a good idea to explain in a couple of sentences what exactly this scan does, and why the user might want to run it.",
  view: (state, send) => h('textarea', {
    attrs: { rows: 7 },
    on: {input: e => send({type: 'set_description', itemType: 'scan', description: e.target.value})}
  }, state.scan.json.description || ''),
  warnings: state => [state.scan.json.description ? undefined : 'With no description it might be hard for people to figure out what your scan does.']
}
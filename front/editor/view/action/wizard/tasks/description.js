import {h} from 'snabbdom/h'

export default {
  title: 'Set Description',
  description: "It's a good idea to explain in a couple of sentences what exactly this action does, and why the user might want to run it.",
  view: (state, send) => h('textarea', {
    attrs: { rows: 7 },
    on: {input: e => send({type: 'set_action_description', description: e.target.value})}
  }, state.action.json.description || ''),
  warnings: state => [state.action.json.description ? undefined : 'With no description it might be hard for people to figure out what your action does.']
}
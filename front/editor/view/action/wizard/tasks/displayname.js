import {h} from 'snabbdom/h'

export default {
  title: 'Set Display Name',
  description: "This will be the name shown to the user in Fantastic, it's recommended to set this, otherwise the filename will be shown instead, which can be less descriptive.",
  view: (state, send) => h('input', {
    attrs: {value: state.action.json.name ||''},
    on: {input: e => send({type: 'set_name', itemType: 'action', name: e.target.value})}
  }),
  warnings: state => [state.action.json.name ? undefined : 'With no display name your action might be less readable to the user.']
}
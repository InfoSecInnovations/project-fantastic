import {h} from 'snabbdom/h'

export default {
  title: 'Set Display Name',
  description: "This will be the name shown to the user in Fantastic, it's recommended to set this, otherwise the filename will be shown instead, which can be less descriptive.",
  view: (state, send) => h('input', {
    attrs: {value: state.scan.json.name ||''},
    on: {input: e => send({type: 'set_name', itemType: 'scan', name: e.target.value})}
  }),
  warnings: state => [state.scan.json.name ? undefined : 'With no display name your scan might be less readable to the user.']
}
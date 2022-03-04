import {h} from 'snabbdom/h'

export default {
  title: 'Set Function Names',
  description: "Here you can set this function's name to use in the JSON script, and also a display name to show to the user in Fantastic",
  view: (state, send) => {
    const funcName = state.action.wizard.funcName
    const data = state.action.json.functions[funcName]
    return [
      h('div.column', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-name-editor`}}, 'Name'),
        h('input', {
          attrs: {
            value: funcName,
            id: `${state.action.filename}-${funcName}-name-editor`
          },
          on: {input: e => send({type: 'rename_action_function', newName: e.target.value, function: funcName})}
        })
      ]),
      h('div.column', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-display-name-editor`}}, 'Display Name'),
        h('input', {
          attrs: {
            value: data.name || '',
            id: `${state.action.filename}-${funcName}-display-name-editor`
          },
          on: {input: e => send({type: 'action_function_display_name', name: e.target.value, function: funcName})}
        })
      ])
    ]
  },
  warnings: state => [state.action.json.functions[state.action.wizard.funcName].name ? undefined : 'With no display name your function might be less readable to the user.'],
  scope: 'function'
}
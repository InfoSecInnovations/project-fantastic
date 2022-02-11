import {h} from 'snabbdom/h'

const inputTypes = [
  "string",
  "number",
  "password"
]

export default (state, send, funcName, label) => { 
  const data = state.action.json.functions[funcName]
  return h('div.dividers', [
    h('div.row bottom-aligned', [
      h('h4', 'Input'),
      label ? h('div.label', 'The input section allows you to prompt the user for values to be used by the command. Use this feature wisely!') : undefined,
      h('div.mini-button', {
        attrs: {title: 'Add input parameter'},
        on: {click: e => send({type: 'add_action_input', function: funcName})}
      }, '+')
    ]),
    ...(data.inputs ? data.inputs.map((input, i) => h('div.row top-aligned', [
      h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-variable`}}, 'Variable name'),
      h('input', {
        attrs: {id: `${state.action.filename}-${funcName}-input-${i}-variable`, value: input.variable},
        on: {input: e => send({type: 'action_input_variable', function: funcName, index: i, value: e.target.value})}
      }),
      h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-name`}}, 'Display name'),
      h('input', {
        attrs: {id: `${state.action.filename}-${funcName}-input-${i}-name`, value: input.name},
        on: {input: e => send({type: 'action_input_name', function: funcName, index: i, value: e.target.value})}
      }),
      h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-input-${i}-type`}}, 'Input type'),
      h('select', {
        attrs: {id: `${state.action.filename}-${funcName}-input-${i}-type`},
        on: {input: e => send({type: 'action_input_type', function: funcName, index: i, value: e.target.value})}
      }, inputTypes.map(t => h('option', {attrs: {value: t, selected: input.type == t}}, t))),
      h('div.mini-button', {
        attrs: {title: 'Remove input parameter'},
        on: {click: e => send({type: 'remove_action_input', function: funcName, index: i})}
      }, 'X')
    ])) : [])
  ])
}
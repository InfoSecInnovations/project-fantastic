import {h} from 'snabbdom/h'

const typeMappings = {
  string: "text",
  password: "password",
  number: "number"
}

const input = (send, v) => {
  const id = `input-${v.variable}`
  const type = typeMappings[v.type]
  return h('div.item', [
    h('label', {attrs: {for: id}}, v.name),
    h('input', {attrs: {id, type}, on: {change: e => send({type: 'input_value', field: v.variable, value: e.target.value})}})
  ])
}

export default (state, send) => {
  if (!state.action_input) return
  const action = state.action_input
  const action_data = state.actions[action.action]
  return h('div.blur', h('div.dialog', [
    h('h2', `Input values for ${action_data.name}`),
    ...action_data.inputs[action.function].map(v => input(send, v)),
    h('div.item', [
      h('div.button', {
        on: {click: e => {
          send({
            ...action,
            type: action.action_type,
            input: state.action_input.values
          })  
          send({type: 'clear_action_input'}) 
        }}
      }, 'OK')
    ])
  ]))
} 
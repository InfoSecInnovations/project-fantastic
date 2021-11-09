import {h} from 'snabbdom/h'
import Info from '../common/info'

const functionView = (state, send, funcName) => {
  const data = state.action.json.functions[funcName]
  return h('div.column', [
    ...(funcName == 'run' ? [h('h4', 'Run (entry point)')] :
    [
      h('h4', data.name || funcName),
      h('div.column', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-name-editor`}}, 'Name'),
        h('input', {
          attrs: {
            value: funcName,
            id: `${state.action.filename}-${funcName}-name-editor`
          },
          on: {input: e => send({type: 'action_function_rename', name: e.target.value})}
        })
      ]),
      h('div.column', [
        h('label.label', {attrs: {for: `${state.action.filename}-${funcName}-display-name-editor`}}, 'Display Name'),
        h('input', {
          attrs: {
            value: data.name || '',
            id: `${state.action.filename}-${funcName}-display-name-editor`
          },
          on: {input: e => send({type: 'action_function_display_name', name: e.target.value})}
        })
      ])
    ])
  ])
} 

export default (state, send) => h('div#action.content', {class: {hidden: state.mode != 'action'}}, [
  h('div#menu-bar.panel', [
    h('h2', 'Action Editor'), 
    h('div.button', {}, 'Save'), 
    h('div.button', {}, 'Discard Changes'), 
    h('h2', state.action.json.name || state.action.filename)
  ]),
  h('div#action-editor.panel', [
    h('div.column info', Info(
      state,
      send,
      'action',
      state.action.json.name,
      'set_action_name',
      state.action.json.description,
      'set_action_description',
      state.action.json.hosts,
      'enable_action_host',
      state.action.json.role,
      'set_action_role'
    )),
    h('div.column', [
      functionView(state, send, 'run'),
      ...Object.keys(state.action.json.functions).filter(key => key != 'run').map(key => functionView(state, send, key))
    ])
  ])

])
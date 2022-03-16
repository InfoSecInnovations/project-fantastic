import {h} from 'snabbdom/h'

export default (state, send, itemType, label) => h('div.menu-bar panel', [
  h('h2', label),
  h('div.tabs', [
    h('div.button', {
      class: {disabled: state[itemType].editorMode == 'wizard' || !state[itemType].editorMode},
      on: {click: e => send({type: 'editor_mode', itemType, mode: 'wizard'})}
    }, 'Wizard'),
    h('div.button', {
      class: {disabled: state[itemType].editorMode == 'editor'},
      on: {click: e => send({type: 'editor_mode', itemType, mode: 'editor'})}
    }, 'Advanced'),
    h('div.button', {
      class: {disabled: state[itemType].editorMode == 'raw'},
      on: {click: e => send({type: 'editor_mode', itemType, mode: 'raw'})}
    }, 'JSON'),
  ]),
  h('div.item', [
    h('div.button', {
      on: {click: e => send({type: 'save_current_item', itemType})}
    }, 'Save'), 
    h('div.button', {
      on: {click: e => send({type: 'discard_item', itemType, prompt: true})}
    }, 'Discard Changes')
  ]), 
  h('h2', state[itemType].json.name || state[itemType].filename)
])
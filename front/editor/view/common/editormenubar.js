import {h} from 'snabbdom/h'

export default (state, send, itemType, label, availableModes = ['wizard', 'editor', 'raw']) => h('div.menu-bar panel', [
  h('h2', label),
  availableModes && availableModes.length ? h('div.tabs', [
    availableModes.includes('wizard') ? h('div.button', {
      class: {disabled: state[itemType].editorMode == 'wizard' || !state[itemType].editorMode},
      on: {click: e => send({type: 'editor_mode', itemType, mode: 'wizard'})}
    }, 'Wizard') : undefined,
    availableModes.includes('editor') ? h('div.button', {
      class: {disabled: state[itemType].editorMode == 'editor'},
      on: {click: e => send({type: 'editor_mode', itemType, mode: 'editor'})}
    }, 'Advanced') : undefined,
    availableModes.includes('raw') ? h('div.button', {
      class: {disabled: state[itemType].editorMode == 'raw'},
      on: {click: e => send({type: 'editor_mode', itemType, mode: 'raw'})}
    }, 'JSON') : undefined,
  ]) : undefined,
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
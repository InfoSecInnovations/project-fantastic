import {h} from 'snabbdom/h'

export default (state, send) => h('div.column', [
  h('div.item', [h('h4', 'Enabled by default'), h('div.mini-button', {}, '+')]),
  ...state.config.json.assets.default_enable_commands.map(c => h('div.item', [h('div', c), h('div.mini-button', {
    attrs: {title: 'Remove'},
    on: {click: e => send({type: 'config_remove_default_enabled', command: c})}
  }, 'X')]))
])
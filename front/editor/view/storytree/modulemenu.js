import {h} from 'snabbdom/h'

export default (state, send) => state.available_modules ? [
  h('div.module-list', state.available_modules
    .filter(module => !state.modules.find(other => other.name === module))
    .map(
      module => h('div.button', {
        on: {click: e => send({type: 'load_module', module})}
      }, module)
    )
  ),
  h('div.icon_button fas fa-window-close fa-fw', {on: {click: e => send({type: 'load_module_menu', enabled: false})}})
] : undefined
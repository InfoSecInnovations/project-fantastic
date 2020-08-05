import {h} from 'snabbdom/h'

const control = (icon, disabled, page, send) => 
  h(`div.foldout fas fa-${icon} fa-fw`, {
    class: {disabled},
    on: {click: disabled ? () => {} : [send, {type: 'page', page}]}
  })

export default (state, send) => h('div.controls', [
  control('step-backward', !state.page, 0, send),
  control('chevron-left', !state.page, state.page - 1, send),
  control('chevron-right', state.last_page, state.page + 1, send)
])
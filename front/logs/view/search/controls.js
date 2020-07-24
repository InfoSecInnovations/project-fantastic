import {h} from 'snabbdom/h'

export default (state, send) => h('div.controls', [
  h('div.foldout fas fa-step-backward fa-fw', {
    class: {disabled: !state.page},
    on: {click: [send, {type: 'page', page: 0}]}
  }),
  h('div.foldout fas fa-chevron-left fa-fw', {
    class: {disabled: !state.page},
    on: {click: [send, {type: 'page', page: state.page - 1}]}
  }),  
  h('div.foldout fas fa-chevron-right fa-fw', {
    class: {disabled: state.last_page},
    on: {click: [send, {type: 'page', page: state.page + 1}]}
  }),
])
import {h} from 'snabbdom/h'

export default (state, send, data_type, data_key) => h('div.fas fa-star fa-fw history_control', {
  on: {click: e => send({type: 'favorite', data_type, data_key, remove: state.favorites[data_type] && state.favorites[data_type][data_key]})},
  class: {favorited: state.favorites[data_type] && state.favorites[data_type][data_key]}
})
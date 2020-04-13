const H = require('snabbdom/h').default
const Commands = require('./commands')
const Quests = require('./quests')

const leftPanel = (state, send) => {
  return H('div#commands', {class: {folded: !state.left_panel_state || state.left_panel_state == 'none'}}, [
    state.commands && state.left_panel_state == 'host_data' ? Commands(state, send) : undefined,
    state.left_panel_state == 'quests' ? Quests(state, send) : undefined,
    H('div#left_panel_controls', [
      H('img.icon_button', {attrs: {src: 'images/host_data.svg'}, on: {click: [send, {type: 'left_panel_state', state: state.left_panel_state == 'host_data' ? 'none' : 'host_data'}]}}),
      H('img.icon_button', {attrs: {src: 'images/quest.svg'}, on: {click: [send, {type: 'left_panel_state', state: state.left_panel_state == 'quests' ? 'none' : 'quests'}]}})
    ])
  ])
}

module.exports = leftPanel
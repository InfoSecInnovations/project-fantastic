const H = require('snabbdom/h').default
const Commands = require('./commands')
const Quests = require('./quests')

const leftPanel = (state, send) => {
  return H('div#commands', {class: {folded: !state.left_panel_state || state.left_panel_state == 'none'}}, [
    state.commands && state.left_panel_state == 'host_data' ? Commands(state, send) : undefined,
    state.quests && state.left_panel_state == 'quests' ? Quests(state, send) : undefined,
    H('div#left_panel_controls', [
      H('div.icon_button.tooltippable', {
        on: {click: [send, {type: 'left_panel_state', state: state.left_panel_state == 'host_data' ? 'none' : 'host_data'}]}
      }, [
        H('span.fas fa-network-wired fa-fw'),
        H('div.tooltip', H('div.item', 'Host Data Commands'))
      ]),
      H('div.icon_button.tooltippable', {
        on: {click: [send, {type: 'left_panel_state', state: state.left_panel_state == 'quests' ? 'none' : 'quests'}]}
      }, [
        H('span.fas fa-scroll fa-fw'),
        H('div.tooltip', H('div.item', 'Quests'))
      ])
    ])
  ])
}

module.exports = leftPanel
const H = require('snabbdom/h').default
const Commands = require('./commands')
const Quests = require('./quests')
const Tests = require('./tests')

const panel_button = (state, send, panel_state, icon, label) => 
  H('div.icon_button', {
    on: {click: [send, {type: 'left_panel_state', state: state.left_panel_state == panel_state ? 'none' : panel_state}]}
  }, [
    H(`span.fas fa-${icon} fa-fw`),
    H('div.label', label)
  ])

const leftPanel = (state, send) => {
  return H('div#commands', {class: {folded: !state.left_panel_state || state.left_panel_state == 'none'}}, [
    state.commands && state.left_panel_state == 'host_data' ? Commands(state, send) : undefined,
    state.quests && state.left_panel_state == 'quests' ? Quests(state, send) : undefined,
    state.tests && state.left_panel_state == 'tests' ? Tests(state, send) : undefined,
    H('div#left_panel_controls', [
      panel_button(state, send, 'host_data', 'network-wired', 'Host Data Commands'),
      panel_button(state, send, 'tests', 'clipboard-list', 'Tests'),
      panel_button(state, send, 'quests', 'scroll', 'Quests')
    ])
  ])
}

module.exports = leftPanel
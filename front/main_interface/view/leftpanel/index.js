import {h} from 'snabbdom/h'
import Commands from './commands'
import Quests from './quests'
import Scans from './scans'
import History from './history'

const panel_button = (state, send, panel_state, icon, label) => 
  h('div.icon_button', {
    on: {click: [send, {type: 'left_panel_state', state: state.left_panel_state == panel_state ? 'none' : panel_state}]}
  }, [
    h(`span.fas fa-${icon} fa-fw`),
    h('div.label', label)
  ])

export default (state, send) => 
  h('div#left_panel', {class: {panel: state.left_panel_state && state.left_panel_state != 'none'}}, [
    state.commands && state.left_panel_state == 'host_data' ? Commands(state, send) : undefined,
    state.quests && state.stories && state.left_panel_state == 'quests' ? Quests(state, send) : undefined,
    state.scans && state.left_panel_state == 'scans' ? Scans(state, send) : undefined,
    state.history && state.left_panel_state == 'history' ? History(state, send) : undefined,
    h('div#left_panel_controls', [
      panel_button(state, send, 'host_data', 'network-wired', 'Host Data Commands'),
      panel_button(state, send, 'scans', 'clipboard-list', 'Scans'),
      panel_button(state, send, 'quests', 'scroll', 'Quests'),
      panel_button(state, send, 'history', 'history', 'History')
    ])
  ])
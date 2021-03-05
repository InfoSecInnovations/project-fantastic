const headers = {
  action: 'Action',
  scan: 'Scan',
  quest: 'Daily Quest',
  command: 'Set Host Data Command',
  story: 'Story Node',
  selection: 'Filter Results'
}

const log_name = (state, log) => {
  if (log.event_type == 'action') return state.actions[log.action].name
  if (log.event_type == 'scan') return state.scans[log.scan].name
  if (log.event_type == 'quest') return state.quests[log.quest].name
  if (log.event_type == 'command') return state.commands[log.command].name
  if (log.event_type == 'story') {
    const node = state.stories[log.story].nodeData[log.story_node_id]
    const nodeName = node.type == 'actions' ? state.actions[node.key].name : state.scans[node.key].name
    return `${nodeName} from ${state.stories[log.story].name}`
  }
  if (log.event_type == 'selection') return log.label || ''
}

export default (state, log) => `${headers[log.event_type]}: ${log_name(state, log)}`
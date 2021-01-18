const headers = {
  action: 'Run Action',
  test: 'Run Test',
  quest: 'Run Quest',
  command: 'Set Host Data Command',
  story: 'Run Story Node'
}

const log_name = (state, log) => {
  if (log.event_type == 'action') return state.actions[log.action].name
  if (log.event_type == 'test') return state.tests[log.test].name
  if (log.event_type == 'quest') return state.quests[log.quest].name
  if (log.event_type == 'command') return state.commands[log.command].name
  if (log.event_type == 'story') {
    const node = state.stories[log.story].nodeData[log.story_node_id]
    const nodeName = node.type == 'actions' ? state.actions[node.key].name : state.tests[node.key].name
    return `${nodeName} from ${state.stories[log.story].name}`
  }
}

export default (state, log) => `${headers[log.event_type]}: ${log_name(state, log)}`
import _ from "lodash"

const collections = {
  action: 'actions',
  scan: 'scans',
  command: 'commands',
  story: 'stories'
}

export default (state, action) => {
  if (action.itemType) {
    if (action.type == 'editor_mode') state[action.itemType].editorMode = action.mode
    if (action.type == 'next_wizard') state[action.itemType].wizard.index = (state[action.itemType].wizard.index || 0) + 1
    if (action.type == 'previous_wizard') state[action.itemType].wizard.index = state[action.itemType].wizard.index ? state[action.itemType].wizard.index - 1 : 0
    if (action.type == 'complete_wizard') state[action.itemType].wizard.tasks.length = 0
    if (action.type == 'add_wizard_tasks') state[action.itemType].wizard.tasks = state[action.itemType].wizard.tasks.filter(task => !action.tasks.includes(task)).concat(action.tasks) // we want to remove existing copies of the new tasks and add the new ones at the end
    if (action.type == 'set_wizard_tasks') {
      state[action.itemType].wizard.tasks = [...action.tasks]
      state[action.itemType].wizard.index = 0
      state[action.itemType].wizard.mandatory = action.mandatory
    }
    if (action.type == 'set_role') state[action.itemType].json.role = action.role
    if (action.type == 'update_item') {
      state[action.itemType].json = action.json
      state[action.itemType].previousJson = _.cloneDeep(state[action.itemType].json)
    } 
    if (action.type == 'set_name') state[action.itemType].json.name = action.name
    if (action.type == 'set_description') state[action.itemType].json.description = action.description
    if (action.type == 'enable_host') {
      if (action.enabled && !state[action.itemType].json.hosts.includes(action.host)) state[action.itemType].json.hosts.push(action.host)
      else {
        const index = state[action.itemType].json.hosts.findIndex(host => host == action.host)
        if (index >= 0) state[action.itemType].json.hosts.splice(index, 1)
      }
    }
  }
  return state
}
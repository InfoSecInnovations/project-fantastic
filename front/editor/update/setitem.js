import _ from "lodash"
import itemCollections from "../util/itemcollections"
import ActionJson from "../defaults/actionJson"
import ActionWizardIntro from "../defaults/actionWizardIntro"
import ScanJson from "../defaults/scanJson"
import Wizard from "../defaults/wizard"
import QuestConfig from "../defaults/questconfig"
import ScanWizardIntro from "../defaults/scanWizardIntro"

export default (state, action) => {
  if (action.itemType) {
    const getCollection = () => {
      if (!state.modules[state.selectedModule][itemCollections[action.itemType]]) state.modules[state.selectedModule][itemCollections[action.itemType]] = {}
      return state.modules[state.selectedModule][itemCollections[action.itemType]]
    }
    if (action.type == 'init_item') {
      const collection = getCollection()
      if (action.itemType == 'action') {
        collection[action.filename] = ActionJson()
        localStorage.setItem(`${action.itemType}_wizard:${state.selectedModule}/${action.filename}`, JSON.stringify(ActionWizardIntro()))
      }
      if (action.itemType == 'scan') {
        collection[action.filename] = ScanJson()
        localStorage.setItem(`${action.itemType}_wizard:${state.selectedModule}/${action.filename}`, JSON.stringify(ScanWizardIntro()))
      }
      if (action.itemType == 'storyTree') {
        collection[action.filename] = QuestConfig()
      }
    }
    if (action.type == 'set_current_item') {
      state[action.itemType].json = getCollection()[action.filename]
      state[action.itemType].previousJson = _.cloneDeep(state[action.itemType].json)
      state[action.itemType].changed = false
      state[action.itemType].filename = action.filename
      const stored = localStorage.getItem(`${action.itemType}_wizard:${state.selectedModule}/${action.filename}`)
      state[action.itemType].wizard = (stored && JSON.parse(stored)) || Wizard()
      state.mode = action.itemType
    }
    if (action.type == 'update_current_item') {
      state[action.itemType].json = action.json
      state[action.itemType].previousJson = _.cloneDeep(state[action.itemType].json)
    } 
    if (action.type == 'save_current_item') {
      localStorage.setItem(`${action.itemType}_wizard:${state.selectedModule}/${state[action.itemType].filename}`, JSON.stringify(state[action.itemType].wizard))
      state[action.itemType].changed = false
    }
    if (action.type == 'set_item') {
      getCollection()[action.filename] = action.json
    }

    if (action.type == 'remove_item') {
      delete getCollection()[action.filename]
    }

    if (action.type == 'editor_mode') state[action.itemType].editorMode = action.mode

    if (action.type == 'set_role') state[action.itemType].json.role = action.role
    if (action.type == 'set_name') state[action.itemType].json.name = action.name
    if (action.type == 'set_description') state[action.itemType].json.description = action.description
    if (action.type == 'enable_host') {
      if (action.enabled && !state[action.itemType].json.hosts.includes(action.host)) state[action.itemType].json.hosts.push(action.host)
      else {
        const index = state[action.itemType].json.hosts.findIndex(host => host == action.host)
        if (index >= 0) state[action.itemType].json.hosts.splice(index, 1)
      }
    }

    if (action.type == 'next_wizard') state[action.itemType].wizard.index = (state[action.itemType].wizard.index || 0) + 1
    if (action.type == 'previous_wizard') state[action.itemType].wizard.index = state[action.itemType].wizard.index ? state[action.itemType].wizard.index - 1 : 0
    if (action.type == 'complete_wizard') state[action.itemType].wizard.tasks.length = 0
    if (action.type == 'add_wizard_tasks') state[action.itemType].wizard.tasks = state[action.itemType].wizard.tasks.slice(0, (state[action.itemType].wizard.index || 0) + 1).concat(action.tasks) // we want to remove existing tasks after the current index then add the new ones
    if (action.type == 'set_wizard_tasks') {
      state[action.itemType].wizard.tasks = [...action.tasks]
      state[action.itemType].wizard.index = 0
      state[action.itemType].wizard.mandatory = action.mandatory
    }

    if (state[action.itemType].json && !_.isEqual(state[action.itemType].json, state[action.itemType].previousJson)) {
      state[action.itemType].changed = true
      state[action.itemType].previousJson = _.cloneDeep(state[action.itemType].json)
    }
  }
  return state
}
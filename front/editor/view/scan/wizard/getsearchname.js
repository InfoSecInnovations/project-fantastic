import ItemFromKey from "../../../util/itemfromkey";
import ModuleFromKey from "../../../util/modulefromkey";
import GetActionName from "./getactionname";
import IsValidFollowupAction from "./isvalidfollowupaction";
import IsValidFollowupData from "./isvalidfollowupdata";

export default (state, actionIndex, searchIndex) => {
  const action = state.scan.json.actions && state.scan.json.actions[actionIndex]
  const search = action && action.search && action.search[searchIndex]
  let text
  const mode = search && search.hasOwnProperty('followup') ? 'followup' : 'label'
  if (mode == 'label' && search.label) text = `Search for ${search.label} result label`
  if (mode == 'followup') {
    if (IsValidFollowupAction(state, actionIndex)) {
      const followup = IsValidFollowupData(state, actionIndex, searchIndex)
      if (followup) {
        const module = ModuleFromKey(state, action.path)
        const actionName = ItemFromKey(action.path)
        const data = module && actionName && module.actions && module.actions[actionName]
        text = `Search for ${data.functions[followup.function].name || followup.function} followup data`
      } 
    }
  }
  return `${GetActionName(state, actionIndex)}, ${!text ? 'invalid search item' : text}`
} 
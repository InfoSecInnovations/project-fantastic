import ItemFromKey from "../../../util/itemfromkey"
import ModuleFromKey from "../../../util/modulefromkey"

export default (state, actionIndex) => {
  const action = state.scan.json.actions[actionIndex]
  const module = ModuleFromKey(state, action.path)
  const actionName = ItemFromKey(action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  return data && data.functions && data.functions.run && data.functions.run.result && data.functions.run.result.followups
}
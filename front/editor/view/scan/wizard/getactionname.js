import ModuleFromKey from "../../../util/modulefromkey";
import ItemFromKey from "../../../util/itemfromkey";

export default (state, index) => {
  const action = state.scan.json.actions[index]
  const module = action && ModuleFromKey(state, action.path)
  const actionName = action && ItemFromKey(action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  return (data && data.name) || actionName || 'invalid action'
}
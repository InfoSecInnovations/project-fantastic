import ActionSelector from "../../elements/actions/actionselector";
import ModuleFromKey from "../../../../util/modulefromkey";
import ItemFromKey from "../../../../util/itemfromkey";

export default {
  title: 'Select Action',
  description: "Scans work by running actions on the currently selected hosts and filtering the results. Please select an action, you will be able to come back and add more actions later should you wish to.",
  view: (state, send) => ActionSelector(state, send, state.scan.json.actions[0], 0),
  errors: state => {
    const action = state.scan.json.actions[0]
    const module = action && ModuleFromKey(state, action.path)
    const actionName = action && ItemFromKey(action.path)
    const data = module && actionName && module.actions && module.actions[actionName]
    return [!data ? 'You must select a valid action!' : undefined]
  },
}
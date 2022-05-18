import ActionSelector from "../../elements/actions/actionselector";
import ModuleFromKey from "../../../../util/modulefromkey";
import ItemFromKey from "../../../../util/itemfromkey";

export default {
  title: 'Select Action',
  description: "Scans work by running actions on the currently selected hosts and filtering the results. Please select an action, you will be able to come back and add more actions later should you wish to. If you need your scan to do something that isn't already supported, you should go and make an action first.",
  view: (state, send) => ActionSelector(state, send, state.scan.json.actions[state.scan.wizard.actionIndex], state.scan.wizard.actionIndex),
  errors: state => {
    const action = state.scan.json.actions[state.scan.wizard.actionIndex]
    const module = action && ModuleFromKey(state, action.path)
    const actionName = action && ItemFromKey(action.path)
    const data = module && actionName && module.actions && module.actions[actionName]
    return [!data ? 'You must select a valid action!' : undefined]
  },
}
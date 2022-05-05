import ItemFromKey from "../../../../util/itemfromkey";
import ModuleFromKey from "../../../../util/modulefromkey";
import ActionFunctionSelector from "../../elements/pass/actionfunctionselector";

export default {
  title: 'Select Failure Followup Action',
  description: 'Please choose the action to run on hosts which failed the scan. You can choose any function from the action, the next step will allow you to supply data to pass into the function if necessary.',
  view: (state, send) => ActionFunctionSelector(state, send),
  nextTasks: state => !state.scan.json.pass.failure.action.function || state.scan.json.pass.failure.action.function == 'run' ? ['enable_quest'] : ['failure_followup_data', 'enable_quest'],
  errors: state => {
    const action = state.scan.json.pass.failure.action
    const module = action && ModuleFromKey(state, action.path)
    const actionName = action && ItemFromKey(action.path)
    const data = module && actionName && module.actions && module.actions[actionName]
    return [!data ? 'You must select a valid action!' : undefined]
  }
}
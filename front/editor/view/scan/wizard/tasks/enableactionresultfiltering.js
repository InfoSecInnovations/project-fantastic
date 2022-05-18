import EnableFilteringButton from "../../elements/actions/enablefilteringbutton"

export default {
  title: 'Enable Action Result Filtering',
  description: 'If you enable this, you will be able to compare elements from the action result data against a JavaScript expression to perform further filtering.',
  view: (state, send) => EnableFilteringButton(state, send, state.scan.wizard.actionIndex, state.scan.wizard.searchIndex),
  nextTasks: state => {
    const search = state.scan.json.actions[state.scan.wizard.actionIndex].search[state.scan.wizard.searchIndex]
    return [
      search.filter ? 'parameters' : undefined,
      search.filter ? 'action_result_filtering' : undefined,
      state.scan.wizard.mandatory ? 'pass' : undefined
    ]
  }
}
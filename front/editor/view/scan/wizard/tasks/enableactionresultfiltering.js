import EnableFilteringButton from "../../elements/actions/enablefilteringbutton"

export default {
  title: 'Enable Action Result Filtering',
  description: 'If you enable this, you will be able to compare elements from the action result data against a JavaScript expression to perform further filtering.',
  view: (state, send) => {
    // TODO: indices from wizard object
    const index = 0
    const searchIndex = 0
    return EnableFilteringButton(state, send, index, searchIndex)
  },
  nextTasks: state => {
    // TODO: indices from wizard object
    const index = 0
    const searchIndex = 0
    const search = state.scan.json.actions[index].search[searchIndex]
    return search.filter ? ['parameters', 'action_result_filtering'] : undefined
  }
}
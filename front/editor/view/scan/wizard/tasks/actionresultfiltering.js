import SearchFilter from "../../elements/actions/searchfilter"

export default {
  title: 'Configure Result Filtering',
  description: 'You can optionally compare action result data against a JavaScript expression to perform further filtering.',
  view: (state, send) => SearchFilter(state, send, state.scan.wizard.actionIndex, state.scan.wizard.searchIndex)
}
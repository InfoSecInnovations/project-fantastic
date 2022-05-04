import SearchFilter from "../../elements/actions/searchfilter"

export default {
  title: 'Configure Result Filtering',
  description: 'You can optionally compare action result data against a JavaScript expression to perform further filtering.',
  view: (state, send) => {
    // TODO: index from wizard data
    const index = 0
    const searchIndex = 0
    return SearchFilter(state, send, index, searchIndex)
  }
}
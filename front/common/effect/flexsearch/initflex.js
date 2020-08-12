const FlexSearch = require('flexsearch')

export default (state, send, data, search_type) => {
  if (!state.flex_search || !state.flex_search[search_type]) return
  const index = new FlexSearch({
    encode: 'advanced',
    tokenize: 'full'  
  })
  Object.entries(data).forEach(v => index.add(v[0], v[1].name))
  send({type: 'search_index', index, search_type})
}
const FlexSearch = require('flexsearch')

export default (state, send, data, search_type) => {
  if (!state.flex_search || !state.flex_search[search_type]) return
  const index = new FlexSearch({
    encode: 'advanced',
    tokenize: 'full',
    doc: {
      id: "id",
      field: [
        "name",
        "description"
      ]
    }
  })
  Object.entries(data).forEach(v => {
    index.add({id: v[0], name: v[1].name, description: v[1].description})
  })
  send({type: 'search_index', index, search_type})
}
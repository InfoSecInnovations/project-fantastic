const searchQuery = state => ({
  ...state.search,
  date: !state.search.date ? 0 : Date.now() - state.search.date * 60 * 1000,
})

module.exports = searchQuery
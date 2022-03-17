export default (state, key) => {
  if (!key) return null
  const sliceIndex = key.lastIndexOf('/')
  if (sliceIndex == -1) return state.modules[state.selectedModule]
  const module = state.modules[key.slice(0, sliceIndex)]
  return module
}
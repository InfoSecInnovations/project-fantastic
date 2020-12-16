export default (state, key) => {
  const sliceIndex = key.lastIndexOf('/')
  const module = state.modules[key.slice(0, sliceIndex)]
  return module
}
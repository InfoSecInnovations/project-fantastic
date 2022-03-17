export default key => {
  if (!key) return null
  const sliceIndex = key.lastIndexOf('/')
  if (sliceIndex == -1) return key
  return key.slice(sliceIndex + 1)
}
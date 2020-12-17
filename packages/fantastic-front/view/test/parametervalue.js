export default (type, value) => {
  if (type === 'number') return parseFloat(value)
  if (type === 'bool') return value === 'true'
  return value
}
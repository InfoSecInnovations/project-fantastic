export default  type => {
  if (type === 'number') return 'number'
  if (type === 'bool') return 'checkbox'
  return 'text'
}
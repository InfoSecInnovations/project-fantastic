export default (state, action) => {
  if (action.type == 'mode') state.mode = action.mode
  return state
}
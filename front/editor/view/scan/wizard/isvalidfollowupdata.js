import GetFollowups from "./getfollowups"

export default (state, actionIndex, searchIndex) => {
  const followups = GetFollowups(state, actionIndex)
  const action = state.scan.json.actions && state.scan.json.actions[actionIndex]
  const search = action && action.search && action.search[searchIndex]
  return followups && search && followups.find(followup => followup.function == search.followup)
}
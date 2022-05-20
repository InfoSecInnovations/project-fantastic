import GetFollowups from "./getfollowups"

export default (state, actionIndex) => {
  const followups = GetFollowups(state, actionIndex)
  return followups && followups.length
}
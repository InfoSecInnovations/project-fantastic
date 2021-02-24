import PerformAction from './performaction'
import ActionResult from './actionresult'
import ActionFollowup from './actionfollowup'
import FollowupFoldout from './followupfoldout'
import FollowupResult from './followupresult'

export default (state, action) => {
  if (action.type == 'actions') state.actions = action.actions
  if (action.type == 'commands') state.commands = action.commands
  if (action.type == 'quests') state.quests = action.quests
  if (action.type == 'scans') state.scans = action.scans
  if (action.type == 'stories') state.stories = action.stories
  if (action.type == 'perform_action') PerformAction(state, action)
  if (action.type == 'action_result') ActionResult(state, action)
  if (action.type == 'result_foldout') state.action_results[action.hostname][action.action].foldout = action.value
  if (action.type == 'action_followup') ActionFollowup(state, action)
  if (action.type == 'action_followup_result') FollowupResult(state, action)
  if (action.type == 'followup_foldout') FollowupFoldout(state, action)
  if (action.type == 'favorite') {
    const obj = state.favorites[action.data_type] || (state.favorites[action.data_type] = {})
    obj[action.data_key] = 'waiting'
  }
  if (action.type == 'toggle_favorite') {
    const obj = state.favorites[action.data_type] || (state.favorites[action.data_type] = {})
    obj[action.data_key] = action.remove ? null : 'favorited'
  }

  return state
}
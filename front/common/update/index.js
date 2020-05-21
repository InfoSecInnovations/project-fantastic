const PerformAction = require('./performaction')
const ActionResult = require('./actionresult')
const ActionFollowup = require('./actionfollowup')
const FollowupFoldout = require('./followupfoldout')
const FollowupResult = require('./followupresult')

const update = (state, action) => {
  if (action.type == 'actions') state.actions = action.actions
  if (action.type == 'perform_action') PerformAction(state, action)
  if (action.type == 'action_result') ActionResult(state, action)
  if (action.type == 'result_foldout') state.action_results[action.hostname][action.action].foldout = action.value
  if (action.type == 'action_followup') ActionFollowup(state, action)
  if (action.type == 'action_followup_result') FollowupResult(state, action)
  if (action.type == 'followup_foldout') FollowupFoldout(state, action)

  return state
}

module.exports = update
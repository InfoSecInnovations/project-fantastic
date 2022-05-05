import EnableFailureFollowup from "../../elements/pass/enablefailurefollowup";
import {h} from 'snabbdom/h'

export default {
  title: 'Enable Failure Followup Action',
  description: "You can define an action to run on failed hosts in order to fix the problem detected by the scan.",
  view: (state, send) => [
    EnableFailureFollowup(state, send),
    h('div', typeof state.scan.json.pass.failure == 'object' ? 'In the next step you will be able to select the followup action and action function.' : 'This scan will not have a followup action.')
  ],
  nextTasks: state => typeof state.scan.json.pass.failure == 'object' ? ['select_failure_action'] : ['enable_quest']
}
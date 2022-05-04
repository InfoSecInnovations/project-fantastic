import {h} from 'snabbdom/h'
import ActionFunctionSelector from './actionfunctionselector'
import EnableFailureFollowup from './enablefailurefollowup'
import FollowupData from './followupdata'
import PassBase from './passbase'

export default (state, send) => h('div.column', [
  h('h3', 'Result Handling'),
  ...PassBase(state, send),
  EnableFailureFollowup(state, send),
  typeof state.scan.json.pass.failure == 'object' ? h('div.column', [
    ...ActionFunctionSelector(state, send),
    FollowupData(state, send)
  ]) : undefined
])
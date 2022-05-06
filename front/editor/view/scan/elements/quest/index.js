import {h} from 'snabbdom/h'
import QuestExplanation from './questexplanation'
import QuestHostSelection from './questhostselection'
import QuestParameters from './questparameters'

export default (state, send) => h('div.column', [
  h('h3', 'Quest configuration'),
  QuestExplanation(state, send),
  ...QuestParameters(state, send),
  ...QuestHostSelection(state, send)
])
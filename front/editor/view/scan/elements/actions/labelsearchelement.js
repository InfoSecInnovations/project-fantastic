import {h} from 'snabbdom/h'
import EnableFilteringButton from './enablefilteringbutton'
import LabelSearchField from './labelsearchfield'
import SearchFilter from './searchfilter'

export default (state, send, index, searchIndex) => {
  const action = state.scan.json.actions[index]
  const search = action.search[searchIndex]
  return [
    EnableFilteringButton(state, send, index, searchIndex),
    LabelSearchField(state, send, index, searchIndex),
    SearchFilter(state, send, index, searchIndex)   
  ]
} 
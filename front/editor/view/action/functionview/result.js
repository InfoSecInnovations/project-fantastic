import {h} from 'snabbdom/h'
import ResultDataView from '../resultdataview'
import Data from '../elements/data'
import FollowupData from '../elements/followupdata'

export default (state, send, funcName, index) => {
  const data = typeof index == 'undefined' ? state.action.json.functions[funcName].result : state.action.json.functions[funcName].result.array[index]
  const baseID = typeof index != 'undefined' ? `${state.action.filename}-${funcName}-result-${index}` : `${state.action.filename}-${funcName}`
  const basePath = typeof index != 'undefined' ? ['array', index] : []
  return [
    h('div.column', [
      h('div.row', [
        h('h4', 'Result label'),
        h('div.label', 'This label is the headline displayed on the action result. It also acts as an identifier so you should aim for it to be unique to each output item.')
      ]),
      ...ResultDataView(
        state,
        send,
        funcName,
        data.label,
        `${baseID}-label`,
        [...basePath, 'label']
      )
    ]),
    Data(state, send, 'Data items allow you to display additional parts of the command output to the user.', funcName, index, baseID, basePath),
    FollowupData(state, send, funcName, index)
  ]
} 
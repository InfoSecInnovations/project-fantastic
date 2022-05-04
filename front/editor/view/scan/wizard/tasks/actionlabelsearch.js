import {h} from 'snabbdom/h'
import LabelSearchField from '../../elements/actions/labelsearchfield'

export default {
  title: 'Configure Label Search',
  description: 'When an action generates result data, each data item is identified by a unique label. In the label search mode, a scan will check to see if a label exists within the result data or not. You will optionally be able to perform further filtering on the data associated with this label.',
  view: (state, send) => {
    // TODO: index from wizard data
    const index = 0
    const searchIndex = 0
    return LabelSearchField(state, send, index, searchIndex)
  }
}
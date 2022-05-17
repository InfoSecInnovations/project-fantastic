import LabelSearchField from '../../elements/actions/labelsearchfield'

export default {
  title: 'Configure Label Search',
  description: 'When an action generates result data, each data item is identified by a unique label. In the label search mode, a scan will check to see if a label exists within the result data or not. You will optionally be able to perform further filtering on the data associated with this label.',
  view: (state, send) => LabelSearchField(state, send, state.scan.wizard.actionIndex, state.scan.wizard.searchIndex),
  errors: state => {
    const action = state.scan.json.actions[state.scan.wizard.actionIndex]
    const search = action.search[state.scan.wizard.searchIndex]
    if (!search.label) return ["Label can't be blank"]
  }
}
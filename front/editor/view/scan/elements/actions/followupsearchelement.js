import {h} from 'snabbdom/h'
import ModuleFromKey from '../../../../util/modulefromkey'
import ItemFromKey from '../../../../util/itemfromkey'

export default (state, send, index, search, searchIndex) => {
  const action = state.scan.json.actions[index]
  const module = ModuleFromKey(state, action.path)
  const actionName = ItemFromKey(action.path)
  const data = module && actionName && module.actions && module.actions[actionName]
  const followups = data && data.functions && data.functions.run && data.functions.run.result && data.functions.run.result.followups
  return [
    followups && followups.length ? h('div', [
      h('div.row', [
        h('label.label', {attrs: {for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-followup`}}, 'Followup'),
        h('select', {
          attrs: {id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-followup`},
          on: {input: e => send({type: 'set_scan_search_item_followup', index, searchIndex, value: e.target.value})}
        }, followups.map(followup => h('option', {attrs: {value: followup.function, selected: search.followup == followup.function}}, data.functions[followup.function].name || followup.function)))
      ]),
      h('div.label', 'Use the enabled status generated for this followup to filter scan results')
    ]) : h('div', "This action doesn't have any followups"),
    h('div.row', [
      h('label', {attrs: { for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-enabled`}}, 'Enabled'),
      h('input', {
        attrs: {
          type: 'checkbox', 
          id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-enabled`
        }, 
        props: {checked: search.filter && search.filter.enabled},
        on: {input: e => send({type: 'set_scan_search_item_followup_status', enabled: e.target.checked, index, searchIndex})}
      }),
      h('div.label', `The enabled property in the followup data should be ${search.filter && search.filter.enabled ? 'true' : 'false'}`)
    ])
  ]
} 
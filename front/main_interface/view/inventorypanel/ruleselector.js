import {h} from 'snabbdom/h'

export default (state, send) => h('div.item', [
  h('label', {attrs: {for: 'inventory-rule-selector'}}, 'Rule type'),
  h('select', {
    attrs: {id: 'inventory-rule-selector'},
    on: {input: e => send({type: 'inventory_rule_mode', mode: e.target.value})}
  }, [
    h('option', {attrs: {value: 'block', selected: state.view_inventory.current_rule.mode == 'block'}}, 'Block items matching all selected properties'),
    h('option', {attrs: {value: 'allow', selected: !state.view_inventory.current_rule.mode || state.view_inventory.current_rule.mode == 'allow'}}, 'Always allow this item')
  ])
])
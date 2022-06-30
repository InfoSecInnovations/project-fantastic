import {h} from 'snabbdom/h'
import RuleSelector from './ruleselector'
import RuleView from './ruleview'

export default (state, send) => h('div.scroll', [
  state.view_inventory.editing_rule ? h('div', [
    RuleSelector(state, send),
    h('div.item', [
      h('div.button', {
        class: {disabled: state.saving_inventory_rule},
        on: {click: e => !state.saving_inventory_rule && send({type: 'save_current_inventory_rule'})}
      }, 'Save'),
      h('div.button', {
        on: {click: e => {
          send({type: 'reset_current_inventory_rule'})
          send({type: 'inventory_panel_mode', mode: 'rules'})}
        }
      }, 'Cancel')
    ])
  ]) : 
  h('div.button', {
    on: {click: e => send({type: 'create_inventory_rule'})}
  }, 'Create Rule'),
  ...(state.inventory_rules && state.inventory_rules[state.view_inventory.category] ? [
    state.inventory_rules[state.view_inventory.category].block ? [
      h('h3', 'Block'),
      ...state.inventory_rules[state.view_inventory.category].block.map(rule => RuleView(send, rule))
    ] : [],
    state.inventory_rules[state.view_inventory.category].allow ? [
      h('h3', 'Allow'),
      ...state.inventory_rules[state.view_inventory.category].allow.map(rule => RuleView(send, rule))
    ] : []
  ] : []).flat()
])
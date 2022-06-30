import {h} from 'snabbdom/h'
import RuleSelector from './ruleselector'
import RuleView from './ruleview'

export default (state, send) => h('div.scroll', [
  h('div', "Protip: if you're trying to create a rule for an item already contained in the inventory, you can do that by clicking \"View Inventory\" on the left and locating the item!"),
  state.view_inventory.editing_rule ? h('div', [
    RuleSelector(state, send),
    h('div.button', {
      on: {click: e => send({type: 'create_inventory_rule_entry'})}
    }, 'Add Key/Value Pair'),
    state.view_inventory.current_rule.data ? h('div', Object.entries(state.view_inventory.current_rule.data).map(([key, value]) => h('div.item', [
      h('input', {
        props: {value: key},
        on: {input: e => send({type: 'rename_inventory_rule_key', oldKey: key, newKey: e.target.value})}
      }),
      h('input', {
        props: {value},
        on: {input: e => send({type: 'set_inventory_rule_value', key, value: e.target.value, enabled: true})}
      }),
      h('div.icon_button', [
        h('span.fas fa-trash', {
          on: {click: e => send({type: 'set_inventory_rule_value', key, value: e.target.value, enabled: false})}
        })
      ])
    ]))) : undefined,
    h('div.item', [
      h('div.button', {
        class: {disabled: state.saving_inventory_rule},
        on: {click: e => !state.saving_inventory_rule && send({type: 'save_current_inventory_rule', mode: 'rules'})}
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
import RuleView from "./ruleview"
import MatchesRule from '@infosecinnovations/fantastic-utils/matchesrule'
import {h} from 'snabbdom/h'
import RuleSelector from "./ruleselector"

const ruleHeaders = {
  allow: 'Allow',
  block: 'Block'
}

export default (state, send) => {
  const existingRules = rule_type => {
    const rules = state.inventory_rules[state.view_inventory.category][rule_type]
    const matching = rules && rules.filter(rule => MatchesRule(state.view_inventory.item, rule.data))
    if (!matching || !matching.length) return undefined
    return h('div.section', [
      h('h4', ruleHeaders[rule_type]),
      ...matching.map(rule => RuleView(rule))
    ])
  }
  return h('div.scroll', [
    h('div', Object.entries(state.view_inventory.item).map(([k, v]) => h('div', `${k}: ${v}`))),
    h('h3', 'Item Rules'),
    ...(state.inventory_rules && state.inventory_rules[state.view_inventory.category] ? [
      existingRules('block'),
      existingRules('allow')
    ] : []),
    h('h4', 'Add Rule'),
    RuleSelector(state, send),
    state.view_inventory.current_rule.mode == 'block' ? h('div', [
      h('div', 'Selecting multiple properties will only block items matching on all of those properties, if you want to match on each property instead, just create multiple rules.'),
      h('input', {
        attrs: {type: 'checkbox'},
        props: {
          indeterminate: state.view_inventory.current_rule.data && Object.keys(state.view_inventory.item).some(k => state.view_inventory.current_rule.data.hasOwnProperty(k)) && !Object.keys(state.view_inventory.item).every(k => state.view_inventory.current_rule.data.hasOwnProperty(k)),
          checked: state.view_inventory.current_rule.data && Object.keys(state.view_inventory.item).every(k => state.view_inventory.current_rule.data.hasOwnProperty(k))
        },
        on: {input: e => send({type: 'inventory_block_all', blocked: e.target.checked})}
      }),
      ...Object.entries(state.view_inventory.item).map(([k, v]) => h('div.row', [
        h('input', {
          attrs: {type: 'checkbox'},
          props: {checked: state.view_inventory.current_rule.data && state.view_inventory.current_rule.data.hasOwnProperty(k)},
          on: {input: e => send({type: 'set_inventory_rule_value', key: k, value: v, enabled: e.target.checked})}
        }),
        h('div', `${k}: ${v}`)
      ]))
    ]) : h('div', "By default any item that doesn't match any blocking rules won't get flagged. An allow rule enables you to create an exception for a specific item (i.e. matching this one on all properties) to ignore blocking rules."),
    h('div.item', [
      h('div.button', {
        class: {disabled: state.saving_inventory_rule},
        on: {click: e => !state.saving_inventory_rule && send({type: 'save_current_inventory_rule'})}
      }, 'Save'),
      h('div.button', {
        on: {click: e => {
          send({type: 'reset_current_inventory_rule'})
          send({type: 'inventory_panel_mode', mode: 'view'})}
        }
      }, 'Back')
    ])
  ])
}
import {h} from 'snabbdom/h'

export default (send, rule) => h('div.rule', [
  h('div', Object.entries(rule.data).map(([k, v]) => h('div', `${k}: ${v}`))),
  h('div.icon_button', {
    on: {click: e => send({type: 'delete_inventory_rule', rule_id: rule.inventory_rule_id})}
  }, [
    h('span.fas fa-trash fa-fw'),
    h('div.label', 'Remove')
  ])
])
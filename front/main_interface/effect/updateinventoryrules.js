import UpdateInventory from '@infosecinnovations/fantastic-front/effect/updateinventory'

export default (state, send, res) => {
  send({type: 'inventory_rules', rules: {...state.inventory_rules, [res.category]: {
    allow: res.rules.filter(rule => rule.rule_type == 'allow'),
    block: res.rules.filter(rule => rule.rule_type == 'block')
  }}})
  UpdateInventory(state.nodes, send)
}
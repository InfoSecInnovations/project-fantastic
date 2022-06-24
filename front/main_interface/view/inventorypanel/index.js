import StatusIcon from '@infosecinnovations/fantastic-front/view/statusicon'
import {h} from 'snabbdom/h'

const editRules = (state, send) => [
  h('div', Object.entries(state.view_inventory.item).map(([k, v]) => h('div', `${k}: ${v}`))),
  h('h3', 'Item Rules'),
  h('h4', 'Add Rule'),
  h('div.item', [
    h('label', {attrs: {for: 'inventory-rule-selector'}}, 'Rule type'),
    h('select', {
      attrs: {id: 'inventory-rule-selector'},
      on: {input: e => send({type: 'inventory_rule_mode', mode: e.target.value})}
    }, [
      h('option', {attrs: {value: 'allow', selected: !state.view_inventory.current_rule.mode || state.view_inventory.current_rule.mode == 'allow'}}, 'Always allow this item'),
      h('option', {attrs: {value: 'block', selected: state.view_inventory.current_rule.mode == 'block'}}, 'Block items matching all selected properties')
    ])
  ]),
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
        on: {input: e => send({type: 'inventory_block_property', property: k, value: v, blocked: e.target.checked})}
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
      on: {click: e => send({type: 'inventory_panel_mode', mode: 'view'})}
    }, 'Cancel')
  ])
]

const viewItems = (state, send) => [
  state.inventory_rules && state.inventory_rules.length ? h('div.button', {
    on: { click: e => send({type: 'inventory_panel_mode', mode: 'rules'}) }
  }, 'View Rules') : undefined,
  h('div.scroll', Object.entries(state.inventory_data).map(([k, v]) => h('div.section', [
    h('h3', k),
    ...(v[state.view_inventory.category].map(v => h('div.item top-aligned', [
      h('div', Object.entries(v.data).map(([k, v]) => h('div', `${k}: ${v}`))),
      h('div', [
        h('div.button', {
          on: { click: e => send({type: 'inventory_panel_mode', mode: 'edit_item_rules', item: v.data}) }
        }, 'Edit Item Rules'),
        v.blocked ? h('div.item', [
          StatusIcon('failure'),
          h('div.failure', 'This item is not allowed under the current rules. Please either remove it from the host machine or create an exception.')
        ]) : undefined
      ])
    ])))
  ])))
]

export default (state, send) => h('div#inventory_viewer.scroll_container', [
  h('h2', `${state.view_inventory.category} Inventory`),
  ...(state.view_inventory.mode == 'edit_item_rules' ? editRules(state, send) : viewItems(state, send)),
  h('div.icon_button close', {on: {click: e => send({type: 'view_inventory', category: null})}}, h('div.fas fa-times fa-fw'))
])
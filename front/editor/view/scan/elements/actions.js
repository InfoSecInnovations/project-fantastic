import {h} from 'snabbdom/h'
import ItemFromKey from '../../../util/itemfromkey'
import ModuleFromKey from '../../../util/modulefromkey'
import ItemSelector from '../../common/itemselector'

export default (state, send) => h('div.column dividers', [
  h('div.row bottom-aligned', [
    h('h3', 'Actions'),
    h('div.label', "The scan will run these actions on all valid hosts to gather the information. If you need to do something that doesn't already exist as an action, please go to the module screen and create an action first."),
    h('div.mini-button', {
      attrs: {title: 'Add Action'},
      on: {click: e => send({type: 'add_scan_action'})}
    }, '+')
  ]),
  ...(state.scan.json.actions ? state.scan.json.actions.map((action, i) => {
    const module = ModuleFromKey(state, action.path)
    const actionName = ItemFromKey(action.path)
    const data = module && actionName && module.actions && module.actions[actionName]
    return h('div.column', [
      ItemSelector(
        state, 
        send, 
        h(
          'div.row bottom-aligned', 
          [
            h('h4', 'Action'),
            h('div', data ? data.name || actionName : 'Please select an action') 
          ]
        ), 
        '✎', 
        'scan_editor_action_selector', 
        'action', 
        fullPath => {
          const actionModule = ModuleFromKey(state, fullPath)
          send({type: 'scan_action_path', index: i, path: actionModule != module ? fullPath : ItemFromKey(fullPath)})
        }
      ),
      h('div.column', [
        h('div.row bottom-aligned', [
          h('h4', 'Search'),
          h('div.label', "The scan will look for the following items in the action result."),
          h('div.mini-button', {
            attrs: {title: 'Add Search Item'},
            on: {click: e => send({type: 'add_scan_search_item', index: i})}
          }, '+')
        ]),
        ...(action.search ? action.search.map((search, j) => h('div.column', [
          h('div', [
            h('div.row', [
              h('label.label', {attrs: {for: `${state.scan.filename}-scan-action-${i}-search-${j}-label`}}, 'Label'),
              h('input', {
                attrs: {id: `${state.scan.filename}-scan-action-${i}-search-${j}-label`},
                props: {value: search.label || ''},
                on: {click: e => send({type: 'set_scan_search_item_label', index: i, searchIndex: j, value: e.target.value})}
              })
            ]),
            h('div.label', 'Search for a result entry with this label')
          ]),
          h('div.column', [
            h('div.row', [
              h('div', 'Filter'),
              h('div.mini-button', {
                attrs: {title: 'Add Filter Item'},
                on: {click: e => send({type: 'add_scan_search_item_filter_entry', index: i, searchIndex: j})}
              }, '+')
            ]),
            ...(search.filter ? Object.entries(search.filter).map(e => h('div.column', [
              h('div.row', [
                h('label.label', {}, 'Key'),
                h('input', {
                  props: { value: e[0] }
                })
              ]),
              h('div.row', [
                h('label.label', {}, 'Expression'),
                h('input', {
                  props: {value: e[1]}
                })
              ])
            ])) : [])
          ])
        ])) : [])
      ])
    ])
  }) : [])
])
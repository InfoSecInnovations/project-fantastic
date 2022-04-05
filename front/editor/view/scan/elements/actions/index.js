import {h} from 'snabbdom/h'
import ItemFromKey from '../../../../util/itemfromkey'
import ModuleFromKey from '../../../../util/modulefromkey'
import ItemSelector from '../../../common/itemselector'
import FollowupSearchElement from './followupsearchelement'
import LabelSearchElement from './labelsearchelement'

const searchModes = [
  'label',
  'followup'
]

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
      h('div.row', [
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
          `scan_editor_action_selector_${i}`, 
          'action', 
          fullPath => {
            const actionModule = ModuleFromKey(state, fullPath)
            send({type: 'scan_action_path', index: i, path: actionModule != module ? fullPath : ItemFromKey(fullPath)})
          }
        ),
        h('div.mini-button', {
          attrs: {title: 'Remove Action'},
          on: {click: e => send({type: 'remove_scan_action', index: i})}
        }, 'X')
      ]),
      h('div.column dividers', [
        h('div.row bottom-aligned', [
          h('h4', 'Search'),
          h('div.label', "The scan will look for the following items in the action result."),
          h('div.mini-button', {
            attrs: {title: 'Add Search Item'},
            on: {click: e => send({type: 'add_scan_search_item', index: i})}
          }, '+')
        ]),
        ...(action.search ? action.search.map((search, j) => {
          const searchMode = search.followup ? 'followup' : 'label'
          return h('div.row top-aligned', [
            h('div.column', [
              h('div.row', [
                h('label.label', { attrs: { for: `${state.scan.filename}-scan-action-${i}-search-${j}-mode` }}, 'Search Mode'),
                h('select', { 
                  attrs: { id: `${state.scan.filename}-scan-action-${i}-search-${j}-mode` },
                  on: { input: e => send({type: 'scan_search_item_mode', index: i, searchIndex: j, value: e.target.value})}
                }, searchModes.map(mode => h('option', {attrs: {value: mode, selected: searchMode == mode}}, mode)))
              ]),
              ...(searchMode == 'label' ? LabelSearchElement(state, send, i, search, j) : FollowupSearchElement(state, send, i, search, j))
            ]),
            h('div.mini-button', {
              attrs: {title: 'Remove Search Item'},
              on: {click: e => send({type: 'remove_scan_search_item', index: i, searchIndex: j})}
            }, 'X')
          ])
        }) : [])
      ])
    ])
  }) : [])
])
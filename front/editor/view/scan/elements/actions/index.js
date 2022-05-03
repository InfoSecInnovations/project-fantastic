import {h} from 'snabbdom/h'
import ActionSelector from './actionselector'
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
  ...(state.scan.json.actions ? state.scan.json.actions.map((action, i) => h('div.column', [
      h('div.row', [
        ActionSelector(state, send, action, i),
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
          const searchMode = search.hasOwnProperty('followup') ? 'followup' : 'label'
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
  ) : [])
])
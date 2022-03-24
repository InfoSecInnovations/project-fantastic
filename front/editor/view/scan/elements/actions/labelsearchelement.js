import {h} from 'snabbdom/h'

export default (state, send, index, search, searchIndex) => [
  h('div', [
    h('div.row', [
      h('label.label', {attrs: {for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-label`}}, 'Label'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-label`},
        props: {value: search.label || ''},
        on: {click: e => send({type: 'set_scan_search_item_label', index, searchIndex, value: e.target.value})}
      })
    ]),
    h('div.label', 'Search for a result entry with this label')
  ]),
  h('div.button', {
    on: {click: e => send({type: 'enable_scan_search_item_filtering', enabled: !search.filter, index, searchIndex})}
  }, `${search.filter ? 'Disable' : 'Enable'} further filtering on this result data.`),
  search.filter ? h('div.column', [
    h('div.row', [
      h('div', 'Filter'),
      h('div.mini-button', {
        attrs: {title: 'Add Filter Item'},
        on: {click: e => send({type: 'add_scan_search_item_filter_entry', index, searchIndex})}
      }, '+')
    ]),
    ...Object.entries(search.filter).map(e => h('div.column', [
      h('div', [
        h('div.row', [
          h('label.label', { attrs: { for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-filter-key-${e[0]}`}}, 'Key'),
          h('input', {
            attrs: { id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-filter-key-${e[0]}`},
            props: { value: e[0] },
            on: {input: e => send({type: 'scan_search_item_rename_filter_key', key: e[0], newKey: e.target.value, index, searchIndex})}
          })
        ]),
        h('div.label', 'Within the result data corresponding to the label, we want the value corresponding to this key')
      ]),
      h('div', [
        h('div.row', [
          h('label.label', { attrs: { for: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-filter-expression-${e[0]}`}}, 'JavaScript Expression'),
          h('input', {
            attrs: { id: `${state.scan.filename}-scan-action-${index}-search-${searchIndex}-filter-expression-${e[0]}`},
            props: {value: e[1]},
            on: {input: e => send({type: 'scan_search_item_filter_expression', key: e[0], value: e.target.value, index, searchIndex})}
          })
        ]),
        h('div.label', 'This JavaScript expression will be appended to the value being filtered and should return true or false.')
      ])
    ]))
  ]) : undefined
]
import {h} from 'snabbdom/h'

const valueTypes = [
  'string_key',
  'array',
  'map',
  'labelled',
  'static',
  'bool',
  'combine',
  'date',
  'key_value_string',
  'text'
]

const help = {
  'string_key': 'Simply grab the value corresponding to this key in the JSON data',
  'array': 'When you want more than one result per data item',
  'map': 'Map from the raw data value corresponding to the key to a value of your choosing',
  'labelled': 'Grab the value corresponding to the key, and label it with the key',
  'static': 'Ignore the data and just output this value',
  'bool': "Intended for use with boolean values. Comes with an option to inverse the result, and the possibility to map the boolean states to values.",
  'combine': 'Join these values together into one value',
  'date': 'Extract a date from a value in the "Date(xxx)" format where xxx is an integer representing a Unix timestamp',
  'key_value_string': 'Extract a value from a string in the "x=y,w=z" format which you can get from some commands',
  'text': 'The raw string data'
}

const resultDataView = (state, send, funcName, resultData, id, path) => {
  let valueType = 'string_key'
  if (Array.isArray(resultData)) valueType = 'array'
  for (const type of valueTypes) {
    if (resultData[type]) {
      valueType = type
      break
    } 
  }
  let fieldEditor
  if (valueType == 'string_key') fieldEditor = h('input', {attrs: {type: 'text'}, props: {value: resultData}})
  if (valueType == 'labelled') fieldEditor = h('input', {attrs: {type: 'text'}, props: {value: resultData.labelled}})
  if (valueType == 'static') fieldEditor = h('input', {attrs: {type: 'text'}, props: {value: resultData.static}})
  if (valueType == 'key_value_string') fieldEditor = h('input', {attrs: {type: 'text'}, props: {value: resultData.key_value_string}})
  if (valueType == 'map') fieldEditor = h('div.column', [
    h('div.row', [
      h('label.label', {attrs: {for: `${id}-map-key`}}, 'Key'),
      h('input', {
        on: { click: e => send({type: 'set_map_key', funcName, key: e.target.value, path})},
        attrs: {
          value: resultData.key || '',
          id: `${id}-map-key`
        }
      }),
      h('div.mini-button', {attrs: {title: 'add mapping'}}, '+')
    ]),
    ...Object.entries(resultData.map).map(e => h('div.row top-aligned', [
      h('div.column', [
        h('label.label', {attrs: {for: `${id}-map-from-${e[0]}`}}, 'From'),
        h('input', {
          on: { click: e => send({type: 'set_map_from', funcName, from: e[0], newFrom: e.target.value, path})},
          attrs: {
            value: e[0],
            id: `${id}-map-from-${e[0]}`
          }
        })
      ]),
      h('div.column', [
        h('label.label', {attrs: {for: `${id}-map-to-${e[0]}`}}, 'To'),
        h('input', {
          on: { click: e => send({type: 'set_map_to', funcName, key: e[0], to: e.target.value, path})},
          attrs: {
            value: e[1],
            id: `${id}-map-to-${e[0]}`
          }
        })
      ]),
      h('div.mini-button', {attrs: {title: 'remove mapping'}}, 'X')
    ]))
  ])
  if (valueType == 'bool') fieldEditor = h('div.column', [
    h('label.label', {attrs: {for: `${id}-bool-key`}}, 'Key'),
    h('input', {
      attrs: {
        id: `${id}-bool-key`,
        value: resultData.bool
      }
    }),
    h('label.label', {attrs: {for: `${id}-select-bool-mode`}}, 'Value mode'),
    h('select', {
      attrs: {
        id: `${id}-select-bool-mode`
      }
    }, [
      h('option', {attrs: {value: 'value', selected: typeof resultData.true == 'undefined' || typeof resultData.false == 'undefined'}}, 'value'),
      h('option', {attrs: {value: 'map', selected: typeof resultData.true != 'undefined' && typeof resultData.false != 'undefined'}}, 'map')
    ]),
    h('div.row', [
      h('input', {
        attrs: {
          type: 'checkbox',
          id: `${id}-bool-inverse`
        }
      }),
      h('label', {attrs: {for: `${id}-bool-inverse`}}, 'Invert')
    ])
  ])
  if (valueType == 'array') fieldEditor = h('div.dividers no-title', resultData.map((d, i) => h('div.column', resultDataView(
    state,
    send,
    funcName,
    d,
    `${id}-array-${i}`,
    [...path, 'array', i]
  ))))
  // TODO: other field editors
  return [
    h('div.row top-aligned', [
      h('div.result-data-selector', [
        h('div.row', [
          h('label.label', {attrs: {for: `${id}-value-type`}}, 'Value type'),
          h('select', {
            attrs: {id: `${id}-value-type`},
            on: {input: e => send({type: 'set_value_type', funcName, type: e.target.value, path})}
          }, valueTypes.map(value => h('option', {attrs: {value, selected: value == valueType}}, value == 'string_key' ? 'key' : value)))
        ]),
        h('div.label', help[valueType])
      ]),
      fieldEditor
    ])
  ]
}

export default resultDataView
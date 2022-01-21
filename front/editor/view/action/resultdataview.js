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
  if (resultData) {
    if (Array.isArray(resultData)) valueType = 'array'
    for (const type of valueTypes) {
      if (resultData.hasOwnProperty(type)) {
        valueType = type
        break
      } 
    }
  }
  let fieldEditor
  if (valueType == 'string_key') fieldEditor = h('input', {
    on: {input: e => send({type: 'set_string_key', funcName, path, isResultData: true, value: e.target.value})},
    attrs: {type: 'text'}, 
    props: {value: resultData || ''}
  })
  if (valueType == 'labelled') fieldEditor = h('input', {
    on: {input: e => send({type: 'set_labelled_key', funcName, path, isResultData: true, value: e.target.value})},
    attrs: {type: 'text'}, 
    props: {value: resultData.labelled}
  })
  if (valueType == 'static') fieldEditor = h('input', {
    on: {input: e => send({type: 'set_static_value', funcName, path, isResultData: true, value: e.target.value})},
    attrs: {type: 'text'}, 
    props: {value: resultData.static}
  })
  if (valueType == 'key_value_string') fieldEditor = h('input', {
    on: {input: e => send({type: 'set_key_value_string_key', funcName, path, isResultData: true, value: e.target.value})},
    attrs: {type: 'text'}, 
    props: {value: resultData.key_value_string}
  })
  if (valueType == 'date') fieldEditor = h('input', {
    on: {input: e => send({type: 'set_date_key', funcName, path, isResultData: true, value: e.target.value})},
    attrs: {type: 'text'}, 
    props: {value: resultData.date}
  })
  if (valueType == 'map') fieldEditor = h('div.column', [
    h('div.row', [
      h('label.label', {attrs: {for: `${id}-map-key`}}, 'Key'),
      h('input', {
        on: { input: e => send({type: 'set_map_key', funcName, key: e.target.value, path, isResultData: true})},
        attrs: {
          value: resultData.key || '',
          id: `${id}-map-key`
        }
      }),
      h('div.mini-button', {
        on: {click: e => send({type: 'add_map_entry', funcName, path, isResultData: true})},
        attrs: {title: 'add mapping'}
      }, '+')
    ]),
    ...Object.entries(resultData.map).map(e => h('div.row top-aligned', [
      h('div.column', [
        h('label.label', {attrs: {for: `${id}-map-from-${e[0]}`}}, 'From'),
        h('input', {
          on: { input: ev => send({type: 'set_map_from', funcName, from: e[0], newFrom: ev.target.value, path, isResultData: true})},
          attrs: {
            value: e[0],
            id: `${id}-map-from-${e[0]}`
          }
        })
      ]),
      h('div.column', [
        h('label.label', {attrs: {for: `${id}-map-to-${e[0]}`}}, 'To'),
        h('input', {
          on: { input: ev => send({type: 'set_map_to', funcName, key: e[0], to: ev.target.value, path, isResultData: true})},
          attrs: {
            value: e[1],
            id: `${id}-map-to-${e[0]}`
          }
        })
      ]),
      h('div.mini-button', {
        on: {click: ev => send({type: 'remove_map_entry', funcName, path, key: e[0], isResultData: true})},
        attrs: {title: 'remove mapping'}
      }, 'X')
    ]))
  ])
  if (valueType == 'bool') fieldEditor = h('div.column', [
    h('label.label', {attrs: {for: `${id}-bool-key`}}, 'Key'),
    h('input', {
      on: {input: e => send({type: 'set_bool_key', funcName, path, value: e.target.value, isResultData: true})},
      attrs: {
        id: `${id}-bool-key`,
        value: resultData.bool
      }
    }),
    h('label.label', {attrs: {for: `${id}-select-bool-mode`}}, 'Value mode'),
    h('select', {
      on: {input: e => send({type: 'set_bool_mode', funcName, path, value: e.target.value, isResultData: true})},
      attrs: {
        id: `${id}-select-bool-mode`
      }
    }, [
      h('option', {attrs: {value: 'value', selected: typeof resultData.true == 'undefined' || typeof resultData.false == 'undefined'}}, 'value'),
      h('option', {attrs: {value: 'map', selected: typeof resultData.true != 'undefined' && typeof resultData.false != 'undefined'}}, 'map')
    ]),
    ...(typeof resultData.true != 'undefined' && typeof resultData.false != 'undefined' ? [
      h('div.row', [
        h('label.label', {for: `${id}-bool-true-value`}, 'Value if true'),
        h('input', {
          on: {input: e => send({type: 'set_bool_true_value', funcName, path, value: e.target.value, isResultData: true})},
          attrs: {
            id: `${id}-bool-true-value`,
            value: resultData.true
          }
        })
      ]),
      h('div.row', [
        h('label.label', {for: `${id}-bool-false-value`}, 'Value if false'),
        h('input', {
          on: {input: e => send({type: 'set_bool_false_value', funcName, path, value: e.target.value, isResultData: true})},
          attrs: {
            id: `${id}-bool-false-value`,
            value: resultData.false
          }
        })
      ])
    ] : []),
    h('div.row', [
      h('input', {
        on: {change: e => send({type: 'set_bool_inverse', funcName, path, value: e.target.checked, isResultData: true})},
        attrs: {
          type: 'checkbox',
          id: `${id}-bool-inverse`
        },
        props: { checked: resultData.inverse }
      }),
      h('label', {attrs: {for: `${id}-bool-inverse`}}, 'Invert')
    ])
  ])
  if (valueType == 'array') fieldEditor = h('div.dividers', [
    h('div.mini-button', {
      attrs: {
        title: 'Add element'
      }
    }, '+'),
    ...resultData.map((d, i) => h('div.row', [
      h('div.column', resultDataView(
        state,
        send,
        funcName,
        d,
        `${id}-array-${i}`,
        [...path, i]
      )),
      h('div.mini-button', {
        attrs: {
          title: 'Remove element'
        }
      }, 'X')
    ]))
  ])
  if (valueType == 'combine') fieldEditor = h('div.dividers', [
    h('div.mini-button', {
      attrs: {
        title: 'Add element'
      }
    }, '+'),
    ...resultData.combine.map((d, i) => h('div.row', [
      h('div.column', resultDataView(
        state,
        send,
        funcName,
        d,
        `${id}-combine-${i}`,
        [...path, 'combine', i]
      )),
      h('div.mini-button', {
        attrs: {
          title: 'Remove element'
        }
      }, 'X')
    ]))
  ])
  return [
    h('div.row top-aligned', [
      h('div.result-data-selector', [
        h('div.row', [
          h('label.label', {attrs: {for: `${id}-value-type`}}, 'Value type'),
          h('select', {
            attrs: {id: `${id}-value-type`},
            on: {input: e => send({type: 'set_value_type', funcName, valueType: e.target.value, path, isResultData: true})}
          }, valueTypes.map(value => h('option', {attrs: {value, selected: value == valueType}}, value == 'string_key' ? 'key' : value)))
        ]),
        h('div.label', help[valueType])
      ]),
      fieldEditor
    ])
  ]
}

export default resultDataView
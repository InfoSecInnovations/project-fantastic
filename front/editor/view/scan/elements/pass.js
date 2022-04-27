import {h} from 'snabbdom/h'
import ItemFromKey from '../../../util/itemfromkey'
import ModuleFromKey from '../../../util/modulefromkey'
import ItemSelector from '../../common/itemselector'

const inputTypes = [
  'string',
  'number',
  'boolean',
  'array'
]

export default (state, send) => h('div.column', [
  h('h3', 'Result Handling'),
  h('div', [
    h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-condition`}}, 'Pass Condition'),
      h('select', {
        attrs: {
          id: `${state.scan.filename}-scan-condition`
        },
        on: {
          click: e => send({type: 'set_scan_condition', value: e.target.value == 'true'})
        }
      }, [
        h('option', {attrs: {value: 'true', selected: state.scan.json.pass.condition}}, 'true'),
        h('option', {attrs: {value: 'false', selected: !state.scan.json.pass.condition}}, 'false')
      ])
    ]),
    h('div.label', 'Evaluating the action result using the filters should return this result for a host to pass the scan.')
  ]),
  h('div', [
    h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-success`}}, 'Success text'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-success`},
        props: {value: state.scan.json.pass.success || ''},
        on: {input: e => send({type: 'scan_success_text', value: e.value})}
      })
    ]),
    h('div.label', 'If all hosts pass the scan, this text will be displayed. You can use the input parameters preceded by the $ symbol to customize the output')
  ]),
  h('div', [
    h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-failure`}}, 'Failure text'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-failure`},
        props: {value: state.scan.json.pass.failure && typeof state.scan.json.pass.failure == 'object' ? state.scan.json.pass.failure.text : state.scan.json.pass.failure || ''},
        on: {input: e => send({type: 'scan_failure_text', value: e.value})}
      })
    ]),
    h('div.label', "If any hosts didn't pass the scan, this text will be appended to the number of systems that didn't pass. You can use the input parameters preceded by the $ symbol to customize the output")
  ]),
  h('div.button', {
    on: {click: e => send({type: 'enable_scan_failure_followup', enabled: typeof state.scan.json.pass.failure != 'object'})}
  }, `${typeof state.scan.json.pass.failure == 'object' ? 'Disable' : 'Enable'} failure followup action`),
  typeof state.scan.json.pass.failure == 'object' ? (() => {
    const module = ModuleFromKey(state, state.scan.json.pass.failure.action.path)
    const actionName = ItemFromKey(state.scan.json.pass.failure.action.path)
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
        'scan_editor_failure_action_selector', 
        'action', 
        fullPath => {
          const actionModule = ModuleFromKey(state, fullPath)
          send({type: 'scan_failure_action_path', path: actionModule != module ? fullPath : ItemFromKey(fullPath)})
        }
      ),
      data ? h('div.row', [
        h('label.label', { attrs: {for: `${state.scan.filename}-scan-failure-action-function`}}, 'Function'),
        h('select', {
          attrs: { id: `${state.scan.filename}-scan-failure-action-function` },
          on: { input: e => send({type: 'scan_failure_action_function', value: e.target.value})}
        }, Object.entries(data.functions).map(([funcName, funcData]) => h('option', { attrs: { 
          value: funcName, 
          selected: state.scan.json.pass.failure.action.function ? funcName == state.scan.json.pass.failure.action.function : funcName == 'run'
        }}, funcName == 'run' ? 'Run (entry point)' : funcData.name || funcName)))
      ]) : undefined,
      data ? h('div.column', [
        h('div.row', [
          h('h4', 'Action Data'),
          h('div.mini-button', {
            on: {click: e => send({type: 'scan_failure_add_action_data'})},
            attrs: {title: 'add data value'}
          }, '+')
        ]),
        ...(state.scan.json.pass.failure.action.data ? Object.entries(state.scan.json.pass.failure.action.data).map(([key, value]) => {
          let inputType = typeof value
          if (Array.isArray(value)) inputType = 'array'
          return h('div.row', [
            h('label.label', {attrs: {for: `scan-failure-action-data-key-${key}`}}, 'Key'),
            h('input', {
              on: { input: e => send({type: 'scan_failure_action_data_key', key, newKey: e.target.value})},
              props: {value: key},
              attrs: {id: `scan-failure-action-data-key-${key}`}
            }),
            h('label.label', {attrs: {for: `scan-failure-action-data-type-${key}`}}, 'Data Type'),
            h('select', {
              on: {input: e => send({type: 'scan_failure_action_data_type', key, dataType: e.target.value})},
              attrs: {id: `scan-failure-action-data-type-${key}`}
            }, inputTypes.map(input => h('option', { attrs: {
              value: input,
              selected: input == inputType
            }}, input))),
            ...(inputType == 'array' ? [h('div', 'TODO: array type')] : 
            [
              h('label.label', {attrs: {for: `scan-failure-action-data-value-${key}`}}, 'Value'),
              h('input', {
                on: { input: e => send({type: 'scan_failure_action_data_value', key, value: inputType == 'boolean' ? e.target.checked : e.target.value})},
                attrs: {
                  type: inputType == 'number' ? 'number' : inputType == 'boolean' ? 'checkbox' : 'text',
                  id: `scan-failure-action-data-value-${key}`
                },
                props: {value: value}
              })
            ]),
            h('div.mini-button', {
              on: {click: e => send({type: 'scan_failure_remove_action_data', key})},
              attrs: {title: 'remove data value'}
            }, 'X')
          ])
        }) : [])
      ]) : undefined
      // TODO: labels, adding data items
    ])
  })() : undefined
])
import {h} from 'snabbdom/h'
import AvailableParameters from '../availableparameters'

export default (state, send) => [
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
    ]),
    h('div.label', 'Evaluating the action result should return this value for a host to pass the scan.')
  ]),
  h('div', [
    h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-success`}}, 'Success text'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-success`},
        props: {value: state.scan.json.pass.success || ''},
        on: {input: e => send({type: 'scan_success_text', value: e.target.value})}
      })
    ]),
    AvailableParameters(state, 'Show this text if all hosts passed the scan. You can insert values from the user parameters using the $ symbol.')
  ]),
  h('div', [
    h('div.row', [
      h('label.label', { attrs: {for: `${state.scan.filename}-scan-failure`}}, 'Failure text'),
      h('input', {
        attrs: {id: `${state.scan.filename}-scan-failure`},
        props: {value: state.scan.json.pass.failure && typeof state.scan.json.pass.failure == 'object' ? state.scan.json.pass.failure.text : state.scan.json.pass.failure || ''},
        on: {input: e => send({type: 'scan_failure_text', value: e.target.value})}
      })
    ])
  ]),
  AvailableParameters(state, "Show this text if any hosts didn't pass the scan, it will be preceded by \"x hosts\" where x is the number of hosts that failed. You can insert values from the user parameters using the $ symbol.")
]

  
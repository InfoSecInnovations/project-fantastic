import {h} from 'snabbdom/h'

export default (status, filter_data) => {
  if (!status || status === 'none') return
  const pass = status === 'pass'
  return h('div.tooltippable', [
    h(
      `span.fas fa-${pass ? 'check-circle' : 'exclamation-circle'} fa-fw`, 
      {class: {pending: !pass, success: pass}}
    ),
    h('div.tooltip', pass ? filter_data.pass : filter_data.fail)
  ])
}
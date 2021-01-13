import {h} from 'snabbdom/h'

export default status => {
  if (status == 'success') return h('span.fas fa-check-circle fa-fw success')
  if (status == 'failure') return h('span.fas fa-times-circle fa-fw failure')
  return h('span.fas fa-exclamation-circle fa-fw pending')
}
import {h} from 'snabbdom/h'

export default (state, send, title, description, inputView, warnings, errors, isLast) => {
  if (typeof isLast == 'undefined') isLast = state.action.wizard.index == state.action.wizard.tasks.length - 1
  const isFirst = !state.action.wizard.index
  const hasWarnings = warnings && warnings.length && warnings.some(warning => warning)
  const hasErrors = errors && errors.length && errors.some(error => error)
  return h('div.wizard', [
    h('h3', title),
    h('div', description),
    inputView,
    ...(hasWarnings ? warnings.map(warning => warning && h('div.warning', warning)) : []),
    ...(hasErrors ? errors.map(error => error && h('div.error', error)) : []),
    h('div.nav-buttons', [
      isFirst ? h('div') : h('div.button', { // the first item has a dummy element to keep the spacing between buttons
        on: { click: e => send({type: 'action_previous_wizard'}) }
      }, 'Previous'),
      isLast ? h('div.button', {
        class: {disabled: hasErrors},
        on: hasErrors ? undefined :  { click: e => send({type: 'action_complete_wizard'}) }
      }, 'Done') : 
      h('div.button', {
        class: {disabled: hasErrors},
        on: hasErrors ? undefined : { click: e => send({type: 'action_next_wizard'}) }
      }, 'Next')
    ])
  ])
} 
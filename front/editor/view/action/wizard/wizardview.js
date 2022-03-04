import {h} from 'snabbdom/h'

export default (state, send, taskData) => {
  let nextTasks = taskData.nextTasks
  if (nextTasks) nextTasks = nextTasks.filter(task => task)
  const mandatory = state.action.wizard.mandatory
  const isLast = state.action.wizard.index == state.action.wizard.tasks.length - 1 && (!nextTasks || !nextTasks.length)
  const isFirst = !state.action.wizard.index
  const warnings = taskData.warnings && taskData.warnings(state)
  const hasWarnings = warnings && warnings.length && warnings.some(warning => warning)
  const errors = taskData.errors && taskData.errors(state)
  const hasErrors = errors && errors.length && errors.some(error => error)
  const inputView = taskData.view && taskData.view(state, send)
  return h('div.wizard editor-scroll', [
    h('h3', taskData.title),
    ...(Array.isArray(taskData.description) ? taskData.description.map(p => h('div', p)) : [h('div', taskData.description)]),
    ...(Array.isArray(inputView) ? inputView : [inputView]),
    ...(hasWarnings ? warnings.map(warning => warning && h('div.warning', warning)) : []),
    ...(hasErrors ? errors.map(error => error && h('div.error', error)) : []),
    h('div.nav-buttons', [
      isFirst ? h('div') : // the first item has a dummy element to keep the spacing between buttons
      h('div.button', { 
        on: { click: e => send({type: 'action_previous_wizard'}) }
      }, 'Previous'),
      h('div.item', [
        !isLast ? h('div.button', {
          class: {disabled: hasErrors},
          on: hasErrors ? undefined : { click: e => {
            if (nextTasks && nextTasks.length) send({type: 'action_add_wizard_tasks', tasks: nextTasks})
            send({type: 'action_next_wizard'}) 
          }}
        }, 'Next') : undefined,
        isLast || !mandatory ? h('div.button', {
          class: {disabled: hasErrors},
          on: hasErrors ? undefined :  { click: e => send({type: 'action_complete_wizard'}) }
        }, 'Done') : undefined
      ])
    ])
  ])
} 
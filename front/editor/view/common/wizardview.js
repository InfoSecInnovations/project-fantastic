import {h} from 'snabbdom/h'

export default (state, send, taskData, itemType) => {
  const nextTasks = taskData.nextTasks && taskData.nextTasks(state)
  const hasNext = nextTasks && nextTasks.some(task => task)
  const mandatory = state[itemType].wizard.mandatory
  const isLast = state[itemType].wizard.index == state[itemType].wizard.tasks.length - 1 && (!hasNext)
  const isFirst = !state[itemType].wizard.index
  const warnings = taskData.warnings && taskData.warnings(state)
  const hasWarnings = warnings && warnings.length && warnings.some(warning => warning)
  const errors = taskData.errors && taskData.errors(state)
  const hasErrors = errors && errors.length && errors.some(error => error)
  const inputView = taskData.view && taskData.view(state, send)
  return h('div.wizard editor-scroll', h('div.column', [
    h('h3', taskData.title),
    ...(Array.isArray(taskData.description) ? taskData.description.map(p => h('div', p)) : [h('div', taskData.description)]),
    ...(Array.isArray(inputView) ? inputView : [inputView]),
    ...(hasWarnings ? warnings.map(warning => warning && h('div.warning', warning)) : []),
    ...(hasErrors ? errors.map(error => error && h('div.error', error)) : []),
    h('div.nav-buttons', [
      isFirst ? h('div') : // the first item has a dummy element to keep the spacing between buttons
      h('div.button', { 
        on: { click: e => send({type: 'previous_wizard', itemType}) }
      }, 'Previous'),
      h('div.item', [
        !isLast ? h('div.button', {
          class: {disabled: hasErrors},
          on: hasErrors ? undefined : { click: e => {
            if (hasNext) send({type: 'add_wizard_tasks', itemType, tasks: nextTasks.filter(task => task)})
            send({type: 'next_wizard', itemType}) 
          }}
        }, 'Next') : undefined,
        isLast || !mandatory ? h('div.button', {
          class: {disabled: hasErrors},
          on: hasErrors ? undefined :  { click: e => send({type: 'complete_wizard', itemType}) }
        }, 'Done') : undefined
      ])
    ])
  ]))
} 
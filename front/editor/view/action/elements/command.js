import {h} from 'snabbdom/h'

export default (state, send, label, funcName) => {
  const data = state.action.json.functions[funcName]
  const inputs = []
  if (state.action.json.target == 'connection') {
    inputs.push('$process - provided by connection target type - the PID of the process owning the targeted connection.')
    inputs.push('$local_ip - provided by connection target type - the local IP address of the targeted connection.')
    inputs.push('$remote_ip - provided by connection target type - the remote IP address of the targeted connection.')
    inputs.push('$local_port - provided by connection target type - the local port of the targeted connection.')
    inputs.push('$remote_port - provided by connection target type - the remote port of the targeted connection.')
  }
  if (data.inputs) {
    inputs.push(...data.inputs.map(input => `$${input.variable} - provided by the user inputs for this action`))
  }
  Object.entries(state.action.json.functions).filter(([name, data]) => name != funcName && data.result && data.result.followups).forEach(([name, data]) => {
    data.result.followups.filter(followup => followup.function == funcName).forEach(
      followup => Object.keys(followup.data).forEach(variable => inputs.push(`$${variable} - provided by previous function ${name} result`))
    )
  })
  return h('div.column', [
    label ? h('div.label', {attrs: {for: `${state.action.filename}-${funcName}-command-editor`}}, 'PowerShell Command') : undefined,
    inputs.length ? h('div.label', 'Available variables') : undefined,
    ...inputs.map(input => h('div.label', input)),
    h('textarea', {
      attrs: {
        rows: 1,
        id: `${state.action.filename}-${funcName}-command-editor`
      },
      on: {input: e => send({type: 'action_function_command', command: e.target.value, function: funcName})}
    }, data.command || '')
  ])
} 
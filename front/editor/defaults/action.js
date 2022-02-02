import ActionFunction from "./actionFunction";

export default () => ({
  json: {
    hosts: ['local'],
    functions: {
      run: ActionFunction()
    }
  },
  wizard: {
    tasks: [
      'display_name',
      'description',
      'hosts',
      'role',
      'edit_run_function',
      'powershell_command',
      'invocation_method',
      'convertto_json',
      'inputs',
      'result_processing'
    ],
    funcName: 'run'
  }
})
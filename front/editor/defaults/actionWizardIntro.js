import actionWizardBaseTasks from "./actionWizardBaseTasks";

export default () => ({
  tasks: [
    ...actionWizardBaseTasks,
    'edit_run_function',
    'powershell_command',
    'invocation_method',
    'inputs',
    'result_processing'
  ],
  funcName: 'run',
  mandatory: true
})
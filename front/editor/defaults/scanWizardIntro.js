import scanWizardBaseTasks from "./scanWizardBaseTasks";

export default () => ({
  tasks: [
    ...scanWizardBaseTasks,
    'add_action',
    'action_search',
    'enable_action_filtering'
  ],
  mandatory: true
})
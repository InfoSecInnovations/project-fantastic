import scanWizardBaseTasks from "./scanWizardBaseTasks";

export default () => ({
  tasks: [
    ...scanWizardBaseTasks,
    'add_action',
    'action_search'
  ],
  actionIndex: 0,
  searchIndex: 0,
  mandatory: true,
  initialRun: true
})
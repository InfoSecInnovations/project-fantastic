import PassBase from "../../elements/pass/passbase";

export default {
  title: 'Result Handling',
  description: "Here you can determine what we do with the results of the scan. The pass condition allows you to define whether hosts which match the filtering criteria are the ones which passed the scan, or whether they failed. You can set the text to show if the scan passes, and the text if any hosts didn't pass.",
  view: (state, send) => PassBase(state, send),
  nextTasks: state => state.scan.wizard.initialRun ? ['enable_failure_followup', 'enable_quest'] : undefined,
  warnings: state => [
    !state.scan.json.pass.success ? 'It is strongly advised to set the success text to tell the user everything went OK.' : undefined,
    !state.scan.json.pass.failure || (typeof state.scan.json.pass.failure == 'object' && !state.scan.json.pass.failure.text) ? "It is strongly advised to set the failure text to tell the user what's wrong with the hosts that didn't meet requirements." : undefined
  ]
  // TODO: warn about blank fields
}
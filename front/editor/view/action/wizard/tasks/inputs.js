import Inputs from '../../elements/inputs'

export default {
  title: 'Configure User Inputs',
  description: "Here you can add input parameters. The user will be prompted to provide values for these when they run the action, which will be mapped to variable names in the PowerShell command. Use this feature wisely! Just leave this section empty if you don't need user inputs.",
  view: (state, send) => Inputs(state, send, state.action.wizard.funcName)
}
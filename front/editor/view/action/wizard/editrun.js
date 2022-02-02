import {h} from 'snabbdom/h'
import WizardView from './wizardview'

export default (state, send) => WizardView(
  state, 
  send, 
  'Action Info Complete!', 
  "Well done, your action now has all the basic information needed. Let's move on to the interesting part! We're going to edit the \"run\" function which is the entrypoint for this action. This will enable us to run a PowerShell command and display the data to the user in a meaningful way. We can also create other functions that take this data as an input to run further commands."
)
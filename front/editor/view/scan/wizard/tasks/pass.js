import PassBase from "../../elements/pass/passbase";

export default {
  title: 'Result Handling',
  description: "Here you can determine what we do with the results of the scan. The pass condition allows you to define whether hosts which match the filtering criteria are the ones which passed the scan, or whether they failed. You can set the text to show if the scan passes, and the text if any hosts didn't pass.",
  view: (state, send) => PassBase(state, send)
}
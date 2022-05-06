import QuestParameters from "../../elements/quest/questparameters";

export default {
  title: 'Configure Quest Parameters',
  description: "Here you can choose the values for the parameters sent to the Scan when running as a Daily Quest. If you don't set them, the default values will be used.",
  view: (state, send) => QuestParameters(state, send)
}
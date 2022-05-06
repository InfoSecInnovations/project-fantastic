import QuestExplanation from "../../elements/quest/questexplanation";

export default {
  title: 'Set Quest Explanation',
  description: "This information will be displayed after the Scan's description. The Scan description generally says what the Scan does, the Quest explanation should tell the user why they are doing this, try to make it a little educational!",
  view: (state, send) => QuestExplanation(state, send),
  warnings: state => !state.scan.json.quest.explanation ? ["It is strongly recommended to tell the user why they are running this quest!"] : undefined
}
import EnableQuestButton from "../../elements/quest/enablequestbutton";

export default {
  title: 'Enable Scan As Daily Quest',
  description: "If you enable this scan as a daily quest it will have a chance to appear in a user's selection of daily quests. Quests have a fixed set of parameters and host selection criteria to make the user look for specific situations.",
  view: (state, send) => EnableQuestButton(state, send),
  nextTasks: state => state.scan.json.quest ? [
    'quest_explanation', 
    state.scan.json.parameters && state.scan.json.parameters.length ? 'quest_parameters' : undefined, 
    'quest_host_selection'
  ] : undefined
}
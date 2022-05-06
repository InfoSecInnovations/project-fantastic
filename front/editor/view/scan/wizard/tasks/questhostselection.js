import QuestHostSelection from "../../elements/quest/questhostselection";

export default {
  title: 'Quest Host Selection',
  description: "Here you can choose how we select the hosts to be scanned by the Daily Quest. Currently we only support scanning by host last seen time, but we'll likely add more options here in the future.",
  view: (state, send) => QuestHostSelection(state, send)
}
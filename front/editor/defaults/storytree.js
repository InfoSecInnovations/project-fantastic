import QuestConfig from "./questconfig";
const GenerateID = require('@infosecinnovations/fantastic-utils/generateid')

export default () => ({
  nodes: {},
  json: QuestConfig(),
  questId: GenerateID()
})
import GenerateId from "@infosecinnovations/fantastic-utils/generateid";

export default () => ({
  selection: {
    age: {}
  },
  hosts: ['local', 'remote'],
  nodeData: {},
  id: GenerateId()
})
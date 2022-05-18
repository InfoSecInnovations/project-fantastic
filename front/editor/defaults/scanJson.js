import scanAction from "./scanAction";

export default () => ({
  hosts: ['local'],
  actions: [
    scanAction()
  ],
  pass: {
    failure: ''
  }
})
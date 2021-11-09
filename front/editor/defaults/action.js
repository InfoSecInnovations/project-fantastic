import ActionFunction from "./actionFunction";

export default () => ({
  json: {
    hosts: ['local'],
    functions: {
      run: ActionFunction()
    }
  }
})
import ActionFunction from "./actionFunction";

export default () => ({
  hosts: ['local'],
  functions: {
    run: ActionFunction()
  }
})
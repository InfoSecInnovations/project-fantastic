export default send => fetch('/user_history')
  .then(res => res.json())
  .then(res => send({type: 'user_history', history: res}))
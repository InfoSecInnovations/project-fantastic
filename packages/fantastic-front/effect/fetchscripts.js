export default (send, type) => {
  fetch(`/${type}`)
  .then(res => res.json())
  .then(res => send({type, [type]: res}))
}
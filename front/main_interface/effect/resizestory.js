export default (state, send) => {
  const el = state.story.container
  if (!el) return
  const parent = el.parentElement
  const rect = parent.getBoundingClientRect()
  const style = window.getComputedStyle(el)
  const width = parseInt(style.width.replace('px', ''))
  const height = parseInt(style.height.replace('px', ''))
  const scale = Math.min(rect.width / width, rect.height / height)
  send({type: 'story_container_scale', scale})
}
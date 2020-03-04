const FS = require('fs').promises
const MarkdownIt = require('markdown-it')

const md = new MarkdownIt({
  html: true
})

const insert = (body, index, s) => `${body.slice(0, index)}${s}${body.slice(index)}`

const getTitle = body => {
  const start_index = body.indexOf('<h1>')
  if (start_index < 0) return 'Fantastic'
  const end_index = body.indexOf('</h1>')
  return (body.substring(start_index + 4, end_index))
}

const markdown = file => FS.readFile('src/markdown_template.html')
  .then(res => {
    const body = md.render(file)
    const title = getTitle(body)
    const titleIndex = res.indexOf('</title>')
    if (titleIndex >= 0) res = insert(res, titleIndex, title)
    const containerIndex = res.indexOf('md_container')
    const bodyIndex = res.indexOf('</div>', containerIndex)
    res = insert(res, bodyIndex, body)
    return res
  })

const files = (res, req) => {
  res.onAborted(() => res.aborted = true)
  let path = req.getUrl()
  if (!path || path === '/') path = '/index.html'
  if (path.endsWith('.svg')) res.writeHeader('Content-Type', 'image/svg+xml')
  FS.readFile(`src${path}`).then(file => {
    if (path.endsWith('.md')) return markdown(file.toString()).then(file => !res.aborted && res.end(file))
    return !res.aborted && res.end(file)
  }, rej => res.end(''))
}

module.exports = files
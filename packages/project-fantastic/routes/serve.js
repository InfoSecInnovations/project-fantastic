const FS = require('fs').promises
const MarkdownIt = require('markdown-it')
const SVGSon = require('svgson')
const Path = require('path')

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

const svg = (file, query) => SVGSon.parse(file)
  .then(res => {
    if (!res.attributes.width) res.attributes.width = 256
    if (!res.attributes.height) res.attributes.height = 256
    res.attributes.fill = query
    return SVGSon.stringify(res)
  })

const serve = (res, path, query) => {
  if (!path || path === '/') path = '/index.html'
  path = path.startsWith('/help') ? 
  Path.join(__dirname, '..', 'node_modules/@infosecinnovations/fantastic-help', path.replace('/help/', ''))
  : Path.join(__dirname, '..', `src${path}`)
  FS.readFile(path).then(file => {
    if (path.endsWith('.md')) return markdown(file.toString()).then(file => !res.aborted && res.end(file))
    if (path.endsWith('.svg')) {
      res.writeHeader('Content-Type', 'image/svg+xml')
      return svg(file.toString(), query).then(file => !res.aborted && res.end(file))
    }
    if (path.endsWith('.js')) res.writeHeader('Content-Type', 'text/javascript')
    return !res.aborted && res.end(file)
  }, rej => res.end(''))
}

module.exports = serve
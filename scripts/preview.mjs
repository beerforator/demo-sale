import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

// Preview the same per-application SPA fallbacks configured in render.yaml.
const root = resolve('dist')
const variants = new Set(['sushione', 'sushiwto', 'sushitree'])
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.ttf': 'font/ttf', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' }
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    const segments = pathname.split('/').filter(Boolean)
    let file = resolve(root, '.' + pathname)
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403).end(); return
    }
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
      await stat(file)
    } catch {
      if (!variants.has(segments[0])) { res.writeHead(404).end('Not found'); return }
      file = resolve(root, segments[0], 'index.html')
    }
    const data = await readFile(file)
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' })
    res.end(req.method === 'HEAD' ? undefined : data)
  } catch {
    res.writeHead(400).end('Bad request')
  }
}).listen(Number(process.env.PORT ?? 4173), '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${process.env.PORT ?? 4173}`)
})

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { variants } from './variants.mjs'

// Preview the same per-application SPA fallbacks configured in render.yaml.
const root = resolve('dist')
const routes = new Set(variants.map(({ path }) => path))
const previousRoutes = new Map(variants.map(({ workspace, path }) => [workspace, path]))
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.ttf': 'font/ttf', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' }
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    const segments = pathname.split('/').filter(Boolean)
    const previousPath = previousRoutes.get(segments[0])
    if (previousPath) {
      const location = url.pathname.replace(/^\/[^/]+/, `/${previousPath}`) + url.search
      res.writeHead(301, { Location: location }).end()
      return
    }
    let file = resolve(root, '.' + pathname)
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403).end(); return
    }
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
      await stat(file)
    } catch {
      if (!routes.has(segments[0])) { res.writeHead(404).end('Not found'); return }
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

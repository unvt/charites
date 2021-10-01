import path from 'path'
import fs from 'fs'
import http from 'http'
import open from 'open'
import { WebSocketServer } from 'ws'
import watch from 'node-watch'

import { parser } from '../lib/yaml-parser'

export function serve(source: string) {
  const port = process.env.PORT || 8080
  let sourcePath = path.resolve(process.cwd(), source)

  let provider = "geolonia"

  // The `source` is absolute path.
  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (! fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  const server = http.createServer((req, res) => {
      const url = (req.url || '').replace(/\?.*/, '')
      const dir = path.join(path.dirname(path.dirname(__dirname)), 'app')

      switch (url) {
        case '/':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=UTF-8')
          const content = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8')
          res.end(content)
          break;
        case '/style.json':
          const style = parser(sourcePath)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=UTF-8')
          res.end(JSON.stringify(style))
          break;
        case '/style.css':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/css; charset=UTF-8')
          const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf-8')
          res.end(css)
          break;
        case `/${provider}.js`:
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
          const app = fs.readFileSync(path.join(dir, 'provider', 'geolonia.js'), 'utf-8')
          res.end(app.replace('___PORT___', `${port}`))
          break;
      }
  })

  server.listen(port, () => {
    console.log(`Your map is running on http://localhost:${port}/\n`)
    open(`http://localhost:${port}`)
  })

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    watch(path.dirname(sourcePath), { recursive: true, filter: /\.yml$/ }, (event, file) => {
      console.log(`${(event || '').toUpperCase()}: ${file}`)
      try {
        const style = parser(sourcePath)
        ws.send(JSON.stringify(style))
      } catch(e) {
        // Nothing to do
      }
    })
  });
}

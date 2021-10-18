import path from 'path'
import fs from 'fs'
import http from 'http'
import open from 'open'
import { WebSocketServer } from 'ws'
import watch from 'node-watch'

import { parser } from '../lib/yaml-parser'
import { validateStyle } from '../lib/validate-style'
import { defaultValues } from '../lib/defaultValues'

interface options {
  provider?: string
  mapboxAccessToken?: string
}

export function serve(source: string, options: options) {
  const port = process.env.PORT || 8080
  let sourcePath = path.resolve(process.cwd(), source)

  let provider = defaultValues.provider
  if (options.provider) {
    provider = options.provider
  }

  // The `source` is absolute path.
  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (! fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  const server = http.createServer((req, res) => {
      const url = (req.url || '').replace(/\?.*/, '')
      const dir = path.join(defaultValues.providerDir, provider)

      switch (url) {
        case '/':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=UTF-8')
          const content = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8')
          res.end(content)
          break;
        case '/style.json':
          let style
          try {
            style = parser(sourcePath)
            validateStyle(style, provider)
          } catch(error) {
            console.log(error)
          }
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json; charset=UTF-8')
          res.end(JSON.stringify(style))
          break;
        case '/app.css':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/css; charset=UTF-8')
          const css = fs.readFileSync(path.join(dir, 'app.css'), 'utf-8')
          res.end(css)
          break;
        case `/app.js`:
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
          try {
            const app = fs.readFileSync(path.join(dir, 'app.js'), 'utf-8')
            const js = app.replace('___PORT___', `${port}`)
              .replace('___MAPBOX_ACCESS_TOKEN___', `${options.mapboxAccessToken || defaultValues.mapboxAccessToken}`)
            res.end(js)
          } catch(e) {
            throw `Invalid provider: ${provider}`
          }
          break;
      }
  })

  server.listen(port, () => {
    console.log(`Provider: ${provider}`)
    console.log(`Loading your style: ${sourcePath}`)
    console.log(`Your map is running on http://localhost:${port}/\n`)
    open(`http://localhost:${port}`)
  })

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    watch(path.dirname(sourcePath), { recursive: true, filter: /\.yml$/ }, (event, file) => {
      console.log(`${(event || '').toUpperCase()}: ${file}`)
      try {
        const style = parser(sourcePath)
        try {
          validateStyle(style, provider)
        } catch(error) {
          console.log(error)
        }
        ws.send(JSON.stringify(style))
      } catch(e) {
        // Nothing to do
      }
    })
  });

  return server
}

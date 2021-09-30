import path from 'path'
import fs from 'fs'
import http from 'http'
import open from 'open'
import { WebSocketServer } from 'ws'
import watch from 'node-watch'

import { parser } from '../lib/yaml-parser'

const html = `<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <style>
      html, body, #map{width: 100vw; height: 100vh; padding: 0; margin: 0;}
    </style>
  </head>
  <body>
    <div id="map" data-hash="on" data-style="/style"></div>
    <script type="text/javascript" src="https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY"></script>
    <script>
      const map = new geolonia.Map('#map')
      const socket = new WebSocket('ws://localhost:___PORT___');
      socket.addEventListener('message',(message)=>{
        map.setStyle(JSON.parse(message.data))
      });
    </script>
  </body>
</html>`

export function serve(source: string) {
  const port = process.env.PORT || 8080
  let sourcePath = path.resolve(process.cwd(), source)

  // The `source` is absolute path.
  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (! fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  const server = http.createServer((req, res) => {
    if (req.url && '/style' === req.url) {
      const style = parser(sourcePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      res.end(JSON.stringify(style))
    } else if (req.url && '/' === req.url) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html; charset=UTF-8')
      res.end(html.replace('___PORT___', `${port}`))
    }
  })

  server.listen(port, () => {
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

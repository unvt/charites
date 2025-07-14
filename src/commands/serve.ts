import path from 'path'
import fs from 'fs'
import os from 'os'
import http from 'http'
import open from 'open'
// tweak to fix WebSocketServer is not a constructor
const ws = await import('ws')
const WebSocketServer = ws.default.WebSocketServer || ws.WebSocketServer
import watch from 'node-watch'

import { parser } from '../lib/yaml-parser.js'
import { validateStyle } from '../lib/validate-style.js'
import { buildSprite } from '../lib/build-sprite.js'

export interface serveOptions {
  port?: string
  vitePort?: string
  spriteInput?: string
  open?: boolean
  sdf?: boolean
}

export async function serve(source: string, options: serveOptions) {
  let port = process.env.PORT || 8080
  if (options.port) {
    port = Number(options.port)
  }
  let sourcePath = path.resolve(process.cwd(), source)

  // The `source` is absolute path.
  if (source.match(/^\//)) {
    sourcePath = source
  }

  if (!fs.existsSync(sourcePath)) {
    throw `${sourcePath}: No such file or directory`
  }

  let spriteOut: string | undefined = undefined
  let spriteRefresher: (() => Promise<void>) | undefined = undefined
  if (options.spriteInput) {
    spriteOut = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'charites-'))
    spriteRefresher = async () => {
      if (
        typeof options.spriteInput === 'undefined' ||
        typeof spriteOut === 'undefined'
      ) {
        return
      }
      await buildSprite(options.spriteInput, spriteOut, 'sprite', options.sdf)
    }
    await spriteRefresher()
  }

  const server = http.createServer(async (req, res) => {
    const url = (req.url || '').replace(/\?.*/, '')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }

    if (
      typeof spriteOut !== 'undefined' &&
      url.match(/^\/sprite(@2x)?\.(json|png)/)
    ) {
      res.statusCode = 200
      if (url.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json; charset=UTF-8')
      } else {
        res.setHeader('Content-Type', 'image/png')
      }
      res.setHeader('Cache-Control', 'no-store')
      const filename = path.basename(url)
      const fsStream = fs.createReadStream(path.join(spriteOut, filename))
      fsStream.pipe(res)
      return
    }

    switch (url) {
      case '/style.json':
        let style
        try {
          style = parser(sourcePath)
          if (typeof spriteOut !== 'undefined') {
            style.sprite = `http://${
              req.headers.host || `localhost:${port}`
            }/sprite`
          }
          validateStyle(style)
        } catch (error) {
          console.log(error)
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json; charset=UTF-8')
        res.setHeader('Cache-Control', 'no-store')
        res.end(JSON.stringify(style))
        break
      case '/sprite.json':
      case '/sprite@2x.json':
      case '/sprite.png':
      case '/sprite@2x.png':
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
        res.end('Not found')
        break
      default:
        const vitePort = parseInt(options.vitePort || '5137')
        const proxyReq = http.request(
          {
            hostname: 'localhost',
            port: vitePort,
            path: url,
            method: req.method,
            headers: req.headers,
          },
          (viteRes) => {
            res.writeHead(viteRes.statusCode || 500, viteRes.headers)
            viteRes.pipe(res, {
              end: true,
            })
          },
        )
        req.pipe(proxyReq, {
          end: true,
        })
        proxyReq.on('error', (err) => {
          console.error('Error with proxy request:', err)
          res.statusCode = 500
          res.end('Bad gateway: failed to proxy to Vite dev server')
        })
        break
    }
  })

  server.listen(port, () => {
    console.log(`Loading your style: ${sourcePath}`)
    console.log(`Your map is running on http://localhost:${port}/\n`)
    if (options.open) {
      open(`http://localhost:${port}`)
    }
  })

  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws: WebSocket) => {
    const watcher = watch(
      path.dirname(sourcePath),
      { recursive: true, filter: /\.yml$|\.svg$/i },
      (event: string, file: string) => {
        console.log(`${(event || '').toUpperCase()}: ${file}`)
        try {
          if (file?.toLowerCase().endsWith('.yml')) {
            ws.send(
              JSON.stringify({
                event: 'styleUpdate',
              }),
            )
          } else if (
            file?.toLowerCase().endsWith('.svg') &&
            typeof spriteRefresher !== 'undefined'
          ) {
            spriteRefresher().then(() => {
              ws.send(
                JSON.stringify({
                  event: 'spriteUpdate',
                }),
              )
            })
          }
        } catch (_) {
          // Nothing to do
        }
      },
    )
    wss.on('close', () => {
      watcher.close()
    })
  })

  process.on('SIGINT', () => {
    console.log('Cleaning up...')
    server.close()
    if (typeof spriteOut !== 'undefined') {
      fs.rmSync(spriteOut, { recursive: true })
      spriteOut = undefined
    }
    process.exit(0)
  })

  return server
}

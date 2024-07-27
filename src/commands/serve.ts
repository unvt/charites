import path from 'path'
import fs from 'fs'
import os from 'os'
import http from 'http'
import open from 'open'
import { WebSocketServer } from 'ws'
import watch from 'node-watch'

import { parser } from '../lib/yaml-parser.js'
import { validateStyle } from '../lib/validate-style.js'
import { defaultValues } from '../lib/defaultValues.js'
import { buildSprite } from '../lib/build-sprite.js'

export interface serveOptions {
  provider?: string
  port?: string
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

  let provider = defaultValues.provider
  if (options.provider) {
    provider = options.provider
  }

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
    const defaultProviderDir = path.join(defaultValues.providerDir, 'default')
    const providerDir = path.join(defaultValues.providerDir, provider)

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
      case '/':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=UTF-8')
        const content = fs.readFileSync(
          path.join(providerDir, 'index.html'),
          'utf-8',
        )
        res.end(content)
        break
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
      case '/app.css':
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/css; charset=UTF-8')
        const css = fs.readFileSync(
          path.join(defaultProviderDir, 'app.css'),
          'utf-8',
        )
        res.end(css)
        break
      case `/shared.js`:
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
        const shared = fs.readFileSync(
          path.join(defaultProviderDir, 'shared.js'),
          'utf-8',
        )
        const js = shared.replace('___PORT___', `${port}`)
        res.end(js)
        break
      case `/app.js`:
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
        try {
          const app = fs.readFileSync(path.join(providerDir, 'app.js'), 'utf-8')
          const js = app.replace('___PORT___', `${port}`)
          res.end(js)
        } catch (e) {
          throw `Invalid provider: ${provider}`
        }
        break
      default:
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
        res.end('Not found')
        break
    }
  })

  server.listen(port, () => {
    console.log(`Provider: ${provider}`)
    console.log(`Loading your style: ${sourcePath}`)
    console.log(`Your map is running on http://localhost:${port}/\n`)
    if (options.open) {
      open(`http://localhost:${port}`)
    }
  })

  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws) => {
    const watcher = watch(
      path.dirname(sourcePath),
      { recursive: true, filter: /\.yml$|\.svg$/i },
      (event, file) => {
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
        } catch (e) {
          // Nothing to do
        }
      },
    )
    ws.on('close', () => {
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

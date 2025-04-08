import { Command } from 'commander'
import { createServer, InlineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'
import { serve, serveOptions } from '../commands/serve.js'
import { error } from '../lib/error.js'

const program = new Command()
program
  .name('serve')
  .arguments('<source>')
  .description('serve your map locally')
  .option(
    '-i, --sprite-input [<icon input directory>]',
    'directory path of icon source to build icons. The default <icon source> is `icons/`',
  )
  .option('--sdf', 'Allows to use SDF sprite in charites')
  .option('--port [port]', 'Specify custom port')
  .option('--vite-port [vitePort]', 'Specify custom port for vite server')
  .option('--no-open', "Don't open the preview in the default browser")
  .action(async (source: string, serveOptions: serveOptions) => {
    const options: serveOptions = program.opts()
    options.port = serveOptions.port
    options.spriteInput = serveOptions.spriteInput
    options.open = serveOptions.open
    options.sdf = serveOptions.sdf
    options.vitePort = serveOptions.vitePort
    try {
      await startProviderDevServer(options)
      await serve(source, program.opts())
    } catch (e) {
      error(e)
    }
  })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
async function startProviderDevServer(options: serveOptions) {
  const config: InlineConfig = {
    root: path.resolve(__dirname, '../../provider'),
    server: {
      port: parseInt(options.vitePort ?? '5137'),
    },
  }

  const viteServer = await createServer(config)
  await viteServer.listen()
}
export default program

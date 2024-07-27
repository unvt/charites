import { Command } from 'commander'
import { serve, serveOptions } from '../commands/serve.js'
import { error } from '../lib/error.js'
import { defaultSettings } from '../lib/defaultValues.js'
import fs from 'fs'

const program = new Command()
program
  .name('serve')
  .arguments('<source>')
  .description('serve your map locally')
  .option('--provider [provider]', 'your map service. e.g. `geolonia`')
  .option(
    '-i, --sprite-input [<icon input directory>]',
    'directory path of icon source to build icons. The default <icon source> is `icons/`',
  )
  .option('--sdf', 'Allows to use SDF sprite in charites')
  .option('--port [port]', 'Specify custom port')
  .option('--no-open', "Don't open the preview in the default browser")
  .action(async (source: string, serveOptions: serveOptions) => {
    const options: serveOptions = program.opts()
    options.provider = serveOptions.provider
    options.port = serveOptions.port
    options.spriteInput = serveOptions.spriteInput
    options.open = serveOptions.open
    options.sdf = serveOptions.sdf
    if (!fs.existsSync(defaultSettings.configFile)) {
      fs.writeFileSync(
        defaultSettings.configFile,
        `provider: ${options.provider || 'default'}`,
      )
    }
    try {
      await serve(source, program.opts())
    } catch (e) {
      error(e)
    }
  })

export default program

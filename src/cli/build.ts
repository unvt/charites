import { Command } from 'commander'
import { build, buildOptions, buildWatch } from '../commands/build'
import { error } from '../lib/error'
import { defaultSettings } from '../lib/defaultValues'
import fs from 'fs'
import path from 'path'

const program = new Command()
program
  .name('build')
  .arguments('<source> [destination]')
  .description('build a style JSON from the YAML')
  .option('-c, --compact-output', 'build a minified style JSON')
  .option('-w, --watch', 'watch YAML and build when changed')
  .option(
    '-u, --sprite-url [<sprite url>]',
    'url to set as the sprite in style.json',
  )
  .option(
    '-i, --sprite-input [<icon input directory>]',
    'directory path of icon source to build icons. The default <icon source> is `icons/`',
  )
  .option(
    '-o, --sprite-output [<icon output directory>]',
    'directory path to output icon files. The default <icons destination> is the current directory',
  )
  .option(
    '--provider [provider]',
    'your map service. e.g. `mapbox`, `geolonia`',
  )
  .action(
    async (source: string, destination: string, buildOptions: buildOptions) => {
      const options = program.opts()
      options.provider = buildOptions.provider
      options.compactOutput = buildOptions.compactOutput
      options.spriteUrl = buildOptions.spriteUrl
      options.spriteOutput = buildOptions.spriteOutput || process.cwd()

      const spriteInputDefault = path.resolve(process.cwd(), 'icons')

      if (buildOptions.spriteInput) {
        options.spriteInput = buildOptions.spriteInput
      } else if (fs.existsSync(spriteInputDefault)) {
        options.spriteInput = spriteInputDefault
      }

      if (!fs.existsSync(defaultSettings.configFile)) {
        fs.writeFileSync(
          defaultSettings.configFile,
          `provider: ${options.provider || 'default'}`,
        )
      }

      if (buildOptions.watch) {
        try {
          console.log('Start watching...')
          await new Promise((resolve) => {
            const watcher = buildWatch(source, destination, options)
            process.on('SIGINT', () => {
              watcher.close()
              resolve(undefined)
            })
          })
        } catch (e) {
          error(e)
        }
      } else {
        try {
          await build(source, destination, options)
        } catch (e) {
          error(e)
        }
      }
    },
  )

export default program

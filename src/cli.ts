#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs'

import { init } from './commands/init'
import { convert } from './commands/convert'
import { build } from './commands/build'
import { serve } from './commands/serve'

import { defaultSettings } from './lib/defaultValues'

interface buildOptions {
  compactOutput?: boolean
}

const program = new Command();

const error = (message: any) => {
  console.error(message.toString())
  process.exit(1)
}

program
  .option('--provider [provider]', 'your map service. e.g. `mapbox`, `geolonia`')
  .option('--mapbox-access-token [mapboxAccessToken]', 'Access Token for the Mapbox')

program
  .command('init <file>')
  .description('initialize a style JSON')
  .action((file: string) => {
    try {
      init(file)
    } catch(e) {
      error(e)
    }
  })

program
  .command('convert <source> [destination]')
  .description('convert the style JSON to YAML')
  .action((source: string, destination: string) => {
    try {
      convert(source, destination)
    } catch(e) {
      error(e)
    }
  })

program
  .command('build <source> [destination]')
  .description('build a style JSON from the YAML')
  .option('-c, --compact-output', 'build a minified style JSON')
  .action((source: string, destination: string, buildOptions: buildOptions) => {
    const options = program.opts()
    options.compactOutput = buildOptions.compactOutput

    if (! fs.existsSync(defaultSettings.configFile)) {
      fs.writeFileSync(defaultSettings.configFile, `provider: ${options.provider || 'default'}`)
    }
    try {
      build(source, destination, options)
    } catch(e) {
      error(e)
    }
  })

program
  .command('serve <source>')
  .description('serve your map locally')
  .action((source: string) => {
    const options = program.opts()
    if (! fs.existsSync(defaultSettings.configFile)) {
      fs.writeFileSync(defaultSettings.configFile, `provider: ${options.provider || 'default'}`)
    }
    try {
      serve(source, program.opts())
    } catch(e) {
      error(e)
    }
  })

program.parse(process.argv)

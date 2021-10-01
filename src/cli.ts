#!/usr/bin/env node

import { Command } from 'commander';

import { init } from './commands/init'
import { convert } from './commands/convert'
import { build } from './commands/build'
import { serve } from './commands/serve'

const program = new Command();

const error = (message: any) => {
  console.error(message.toString())
  process.exit(1)
}

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
  .action((source: string, destination: string) => {
    try {
      build(source, destination)
    } catch(e) {
      error(e)
    }
  })

program
  .command('serve <source>')
  .description('serve your map locally')
  .option('-p, --provider <provider>', 'your map service. e.g. `mapbox`, `maptiler`, `geolonia`')
  .action((source: string, options: object) => {
    try {
      serve(source, options)
    } catch(e) {
      error(e)
    }
  })

program.parse(process.argv)

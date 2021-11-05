#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs'

import { init, initOptions } from './commands/init'
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
  .command('init <file> --tilejson-urls <tilejson_urls> --metadatajson-urls <metadatajson_urls> --composite-layers')
  .description('initialize a style JSON')
  .option('-t, --tilejson-urls <tilejson_urls>', 'an URL for TileJSON. It will create empty layers from vector_layers property of TileJSON. Please use comma (,) in case multiple TileJSONs require.')
  .option('-m, --metadatajson-urls <metadatajson_urls>', 'an URL for metadata.json. It will create empty layers from vector_layers property of metadata.json. Please use comma (,) in case multiple metadata.json require.')
  .option('-c, --composite-layers', 'If it is true, a single YAML will be generated with multiple layers. Default is false.')
  .action(async(file: string, initOptions: initOptions) => {
    const options = program.opts()
    options.tilejsonUrls = initOptions.tilejsonUrls
    options.metadatajsonUrls = initOptions.metadatajsonUrls
    options.compositeLayers = initOptions.compositeLayers
    try {
      await init(file, options)
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

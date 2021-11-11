#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs'
import path from 'path'

import { init, initOptions } from './commands/init'
import { convert } from './commands/convert'
import { build } from './commands/build'
import { serve } from './commands/serve'

import { defaultSettings } from './lib/defaultValues'
interface buildOptions {
  compactOutput?: boolean,
  spriteUrl?: string,
  spriteInput?: string,
  spriteOutput?: string
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
  .option('-u, --sprite-url [<sprite url>]', 'url to set as the sprite in style.json')
  .option('-i, --sprite-input [<icon input directory>]', 'directory path of icon source to build icons. The default <icon source> is `icons/`')
  .option('-o, --sprite-output [<icon output directory>]', 'directory path to output icon files. The default <icons destination> is the current directory')
  .action(async (source: string, destination: string, buildOptions: buildOptions) => {
    const options = program.opts()
    options.compactOutput = buildOptions.compactOutput
    options.spriteUrl = buildOptions.spriteUrl
    options.spriteOutput = buildOptions.spriteOutput || process.cwd()

    const spriteInputDefault = path.resolve(process.cwd(), 'icons')

    if (buildOptions.spriteInput) {
      options.spriteInput = buildOptions.spriteInput
    } else if (fs.existsSync(spriteInputDefault)) {
      options.spriteInput = spriteInputDefault
    }

    if (! fs.existsSync(defaultSettings.configFile)) {
      fs.writeFileSync(defaultSettings.configFile, `provider: ${options.provider || 'default'}`)
    }
    try {
      await build(source, destination, options)
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

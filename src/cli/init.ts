import { Command } from 'commander'
import { init, initOptions } from '../commands/init'
import { error } from '../lib/error'

const program = new Command()
program
  .name('init')
  .arguments('<file>')
  .description('initialize a style JSON')
  .option(
    '-t, --tilejson-urls <tilejson_urls>',
    'an URL for TileJSON. It will create empty layers from vector_layers property of TileJSON. Please use comma (,) in case multiple TileJSONs require.',
  )
  .option(
    '-m, --metadatajson-urls <metadatajson_urls>',
    'an URL for metadata.json. It will create empty layers from vector_layers property of metadata.json. Please use comma (,) in case multiple metadata.json require.',
  )
  .option(
    '-c, --composite-layers',
    'If it is true, a single YAML will be generated with multiple layers. Default is false.',
  )
  .action(async (file: string, initOptions: initOptions) => {
    const options = program.opts()
    options.tilejsonUrls = initOptions.tilejsonUrls
    options.metadatajsonUrls = initOptions.metadatajsonUrls
    options.compositeLayers = initOptions.compositeLayers
    try {
      await init(file, options)
    } catch (e) {
      error(e)
    }
  })

export default program

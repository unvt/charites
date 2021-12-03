import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec/types'
import { writeYaml } from '../lib/yaml-writer'
import {
  TileJSONImporter,
  MetadataJSONImporter,
} from '../lib/tileinfo-importer'

export interface initOptions {
  tilejsonUrls?: string
  metadatajsonUrls?: string
  compositeLayers?: boolean
}

const styleRoot: StyleSpecification = {
  version: 8,
  name: 'My Style',
  sprite: '',
  glyphs: '',
  sources: {},
  layers: [],
}

export async function init(file: string, options: initOptions) {
  let styleTemplate = JSON.parse(JSON.stringify(styleRoot))
  if (options.tilejsonUrls) {
    const tileJSONImporter = new TileJSONImporter(options.tilejsonUrls)
    styleTemplate = await tileJSONImporter.import(styleTemplate)
  }
  if (options.metadatajsonUrls) {
    const metadataJSONImporter = new MetadataJSONImporter(
      options.metadatajsonUrls,
    )
    styleTemplate = await metadataJSONImporter.import(styleTemplate)
  }
  writeYaml(file, styleTemplate, options.compositeLayers)
}

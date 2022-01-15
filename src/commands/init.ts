import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec/types'
import path from 'path'
import fs from 'fs'
import { writeYaml } from '../lib/yaml-writer'
import {
  TileJSONImporter,
  MetadataJSONImporter,
} from '../lib/tileinfo-importer'
import Config from '../lib/config'

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

export async function init(projectDir: string, options: initOptions) {
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
  const projectDirPath = path.resolve(projectDir)
  if (!fs.existsSync(projectDirPath)) {
    fs.mkdirSync(projectDirPath)
  }
  const config: Config = new Config()
  const styleYaml = path.join(projectDirPath, config.style.yamlPath)
  writeYaml(styleYaml, styleTemplate, options.compositeLayers)
  config.write(projectDirPath)
}

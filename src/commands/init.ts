import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
import axios from 'axios'
import { TileJSON } from '../types'
import { StyleSpecification, SourceSpecification, LayerSpecification } from '@maplibre/maplibre-gl-style-spec/types'

export interface initOptions {
  tilejson_urls?: string
}

const styleRoot: StyleSpecification = {
  version: 8,
  name: "My Style",
  sprite: "",
  glyphs: "",
  sources: {},
  layers: []
}

const generateYAML = (stylejson: StyleSpecification, dist_file: string) => {
  const styleYAML = YAML.dump(stylejson)
  let stylePath = path.resolve(process.cwd(), dist_file)

  // The `source` is absolute path.
  if (dist_file.match(/^\//)) {
    stylePath = dist_file
  }

  try {
    fs.writeFileSync(stylePath, styleYAML)
  } catch(err) {
    throw `${stylePath}: Permission denied`
  }
}

type ResponseTileJSON = {
  sources: { [key: string]: SourceSpecification; },
  layers: LayerSpecification[],
}

const getTileJSON = (url: string) => {
  return new Promise<ResponseTileJSON> ((resolve, reject) => {
    axios.get(url).then(res=>{
      const tilejson: TileJSON = res.data
      const tilesetName : string =  (tilejson.name) ? tilejson.name : Math.random().toString(32).substring(2)
      
      const sources : { [key: string]: SourceSpecification; } = {}
      sources[tilesetName] = {
        type: 'vector',
        url: url
      }

      const layers : LayerSpecification[] = []
      tilejson.vector_layers.forEach(layer=>{
        const layerStyle : LayerSpecification = {
          "id": layer.id,
          "type": "fill",
          "source": tilesetName,
          "source-layer": layer.id,
          "layout": { },
          "paint": { }
        }
        layers.push(layerStyle)
      })
      resolve({ sources, layers})
    })
    .catch(reject)
  })
}

export async function init(file: string, options: initOptions) {
  if (options.tilejson_urls) {
    const tilejson_urls = options.tilejson_urls + ''
    const urls: string[] = tilejson_urls.split(',')
    const promises = urls.map(url=>getTileJSON(url))
    const reponses = await Promise.all(promises)
    reponses.forEach(res=>{
      Object.keys(res.sources).forEach(sourceName=>{
        styleRoot.sources[sourceName] = res.sources[sourceName]
      })
      styleRoot.layers = styleRoot.layers.concat(res.layers)
    })
  }
  generateYAML(styleRoot, file)
}

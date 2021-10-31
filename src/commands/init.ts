import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
import axios from 'axios'
import { TileJSON } from '../types'
import { StyleSpecification, LayerSpecification } from '@maplibre/maplibre-gl-style-spec/types'

export interface initOptions {
  tilejson_url?: string
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

export async function init(file: string, options: initOptions) {
  const tilejson_url = options.tilejson_url
  if (tilejson_url) {
    const res = await axios.get(tilejson_url)
    const tilejson: TileJSON = res.data
    const tilesetName : string =  (tilejson.name) ? tilejson.name : Math.random().toString(32).substring(2)
    styleRoot.sources[tilesetName] = {
      type: 'vector',
      url: tilejson_url
    }
    tilejson.vector_layers.forEach(layer=>{
      const layerStyle : LayerSpecification = {
        "id": layer.id,
        "type": "fill",
        "source": tilesetName,
        "source-layer": layer.id,
        "layout": { },
        "paint": { }
      }
      styleRoot.layers.push(layerStyle)
    })
  } 
  generateYAML(styleRoot, file)
}

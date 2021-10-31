import path from 'path'
import fs from 'fs'
import YAML from 'js-yaml'
import axios from 'axios'

export interface initOptions {
  tilejson_url?: string
}

type vector_layers = {
  id: string,
  fields: { [key: string]: string; }
}

type tilejson = {
  tilejson: string,
  name: string,
  description: string,
  version: string,
  attribution: string,
  scheme: string,
  tiles: string[],
  minzoom: number,
  maxzoom: number,
  bounds: number[],
  fillzoom: number,
  something_custom: string,
  vector_layers: vector_layers[]
}

// TODO: We need type definition for style.
const styleRoot = {
  version: 8,
  name: "My Style",
  sprite: "",
  glyphs: "",
  sources: {},
  layers: []
}

const generateYAML = (stylejson: any, dist_file: string) => {
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
    const tilejson: tilejson = res.data
    // @ts-ignore
    styleRoot.sources[tilejson.name] = {
      type: 'vector',
      url: tilejson_url
    }
    tilejson.vector_layers.forEach(layer=>{
      
      styleRoot.layers.push({
        // @ts-ignore
        "id": layer.id,
        // @ts-ignore
        "type": "fill",
        // @ts-ignore
        "source": tilejson.name,
        // @ts-ignore
        "source-layer": layer.id,
        // @ts-ignore
        "layout": { },
        // @ts-ignore
        "paint": { }
      })
    })
  } 
  generateYAML(styleRoot, file)
}

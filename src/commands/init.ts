import axios from 'axios'
import { TileJSON, MetadataJSON, VectorLayer } from '../types'
import { StyleSpecification, SourceSpecification, LayerSpecification, VectorSourceSpecification } from '@maplibre/maplibre-gl-style-spec/types'
import { writeYaml } from '../lib/yaml-writer'

export interface initOptions {
  tilejsonUrls?: string,
  metadatajsonUrls?: string,
  compositeLayers?: boolean
}

const styleRoot: StyleSpecification = {
  version: 8,
  name: "My Style",
  sprite: "",
  glyphs: "",
  sources: {},
  layers: []
}

const getTileJSON = async(url: string) => {
  const res = await axios.get(url)
  const tilejson: TileJSON = res.data
  const tilesetName : string =  (tilejson.name) ? tilejson.name : Math.random().toString(32).substring(2)
  
  const sources : { [key: string]: SourceSpecification; } = {}
  sources[tilesetName] = {
    type: 'vector',
    url: url
  }

  const layers : LayerSpecification[] = getVectorLayers(tilesetName, tilejson.vector_layers)
  return {sources, layers}
}

const getMetadataJSON = async(url: string) => {
  const res = await axios.get(url)
  const matadataJSON: MetadataJSON = res.data
  const metadataName : string =  (matadataJSON.name) ? matadataJSON.name : Math.random().toString(32).substring(2)
  
  const sources : { [key: string]: VectorSourceSpecification; } = {}
  sources[metadataName] = {
    type: 'vector',
    tiles: [url],
  }
  if (matadataJSON.minzoom) {
    sources[metadataName].minzoom = matadataJSON.minzoom
  }
  if (matadataJSON.maxzoom) {
    sources[metadataName].maxzoom = matadataJSON.maxzoom
  }

  let layers : LayerSpecification[] = []
  if (matadataJSON.json) {
    const vector_layers: VectorLayer[] = JSON.parse(matadataJSON.json).vector_layers
    layers = getVectorLayers(metadataName, vector_layers)
  }
  return {sources, layers}
}

const getVectorLayers = (name: string, vector_layers: VectorLayer[]) => {
  const layers : LayerSpecification[] = []
  if (vector_layers) {
    vector_layers.forEach(layer=>{
      const layerStyle : LayerSpecification = {
        "id": layer.id,
        "type": "fill",
        "source": name,
        "source-layer": layer.id,
        "layout": { },
        "paint": { }
      }
      layers.push(layerStyle)
    })
  }
  return layers
}
  

export async function init(file: string, options: initOptions) {
  const styleTemplate = JSON.parse(JSON.stringify(styleRoot))
  if (options.tilejsonUrls) {
    const tilejson_urls = options.tilejsonUrls + ''
    const urls: string[] = tilejson_urls.split(',')
    const responses = await Promise.all(urls.map(url=>getTileJSON(url)))
    responses.forEach(res=>{
      Object.keys(res.sources).forEach(sourceName=>{
        styleTemplate.sources[sourceName] = res.sources[sourceName]
      })
      if (res.layers.length > 0) {
        styleTemplate.layers = styleTemplate.layers.concat(res.layers)
      }
    })
  }
  if (options.metadatajsonUrls) {
    const metadatajson_urls = options.metadatajsonUrls + ''
    const urls: string[] = metadatajson_urls.split(',')
    const responses = await Promise.all(urls.map(url=>getMetadataJSON(url)))
    responses.forEach(res=>{
      Object.keys(res.sources).forEach(sourceName=>{
        styleTemplate.sources[sourceName] = res.sources[sourceName]
      })
      if (res.layers.length > 0) {
        styleTemplate.layers = styleTemplate.layers.concat(res.layers)
      }
    })
  }
  writeYaml(file, styleTemplate, options.compositeLayers)
}

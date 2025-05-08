import { MetadataJSON, VectorLayer } from '../../types/index.js'
import {
  LayerSpecification,
  VectorSourceSpecification,
} from '@maplibre/maplibre-gl-style-spec'
import { BaseImporter, TileInfoJSONResponse } from './base-importer.js'

export class MetadataJSONImporter extends BaseImporter {
  async getJSON(url: string): Promise<TileInfoJSONResponse> {
    const res = await fetch(url)
    const matadataJSON: MetadataJSON = await res.json()
    const metadataName: string = matadataJSON.name
      ? matadataJSON.name
      : Math.random().toString(32).substring(2)

    const sources: { [key: string]: VectorSourceSpecification } = {}
    const urlSplited = url.split('/')
    sources[metadataName] = {
      type: 'vector',
      tiles: [
        url.replace(
          new RegExp(urlSplited[urlSplited.length - 1], 'g'),
          '{z}/{x}/{y}.pbf',
        ),
      ],
    }
    if (matadataJSON.minzoom) {
      sources[metadataName].minzoom = matadataJSON.minzoom
    }
    if (matadataJSON.maxzoom) {
      sources[metadataName].maxzoom = matadataJSON.maxzoom
    }

    let layers: LayerSpecification[] = []
    if (matadataJSON.json) {
      const vector_layers: VectorLayer[] = JSON.parse(
        matadataJSON.json,
      ).vector_layers
      layers = this.getVectorLayers(metadataName, vector_layers)
    }
    return { sources, layers }
  }
}

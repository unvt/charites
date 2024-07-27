import axios from 'axios'
import { TileJSON } from '../../types/index.js'
import {
  SourceSpecification,
  LayerSpecification,
} from '@maplibre/maplibre-gl-style-spec'
import { BaseImporter, TileInfoJSONResponse } from './base-importer.js'

export class TileJSONImporter extends BaseImporter {
  async getJSON(url: string): Promise<TileInfoJSONResponse> {
    const res = await axios.get(url)
    const tilejson: TileJSON = res.data
    const tilesetName: string = tilejson.name
      ? tilejson.name
      : Math.random().toString(32).substring(2)

    const sources: { [key: string]: SourceSpecification } = {}
    sources[tilesetName] = {
      type: 'vector',
      url: url,
    }

    const layers: LayerSpecification[] = this.getVectorLayers(
      tilesetName,
      tilejson.vector_layers,
    )
    return { sources, layers }
  }
}

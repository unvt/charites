import { VectorLayer } from '../../types'
import {
  StyleSpecification,
  SourceSpecification,
  LayerSpecification,
  VectorSourceSpecification,
} from '@maplibre/maplibre-gl-style-spec/types'

export type TileInfoJSONResponse = {
  sources: { [key: string]: SourceSpecification | VectorSourceSpecification }
  layers: LayerSpecification[]
}

export abstract class BaseImporter {
  protected urls: string[]

  constructor(original_urls: string) {
    const temp_urls = original_urls + ''
    this.urls = temp_urls.split(',')
  }

  abstract getJSON(url: string): Promise<TileInfoJSONResponse>

  async import(style: StyleSpecification) {
    if (this.urls.length === 0) return
    const responses = await Promise.all(
      this.urls.map((url) => this.getJSON(url)),
    )
    responses.forEach((res) => {
      Object.keys(res.sources).forEach((sourceName) => {
        style.sources[sourceName] = res.sources[sourceName]
      })
      if (res.layers.length > 0) {
        style.layers = style.layers.concat(res.layers)
      }
    })
    return style
  }

  protected getVectorLayers(name: string, vector_layers: VectorLayer[]) {
    const layers: LayerSpecification[] = []
    if (vector_layers) {
      vector_layers.forEach((layer) => {
        const layerStyle: LayerSpecification = {
          id: layer.id,
          type: 'fill',
          source: name,
          'source-layer': layer.id,
          layout: {},
          paint: {},
        }
        layers.push(layerStyle)
      })
    }
    return layers
  }
}

import { VectorLayer } from './vector_layers'

/**
 * Definition of TileJSON v3.0.0
 * see https://github.com/mapbox/tilejson-spec/blob/master/3.0.0/schema.json
 */
export type TileJSON = {
  tilejson: string
  tiles: string[]
  vector_layers: VectorLayer[]
  attribution?: string
  bounds?: number[]
  center?: number[]
  data?: string[]
  description?: string
  fillzoom?: number
  grids?: string[]
  legend?: string
  maxzoom?: number
  minzoom?: number
  name?: string
  scheme?: string
  template?: string
  version?: string
}

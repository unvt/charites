/**
 * Definition of vector_layers object
 * see https://github.com/mapbox/tilejson-spec/blob/master/3.0.0/schema.json
 */
export type VectorLayer = {
  id: string
  fields: { [key: string]: string }
  description: string
  maxzoom: string
  minzoom: string
}

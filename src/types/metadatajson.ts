/**
 * Definition of metadata.json
 */
export type MetadataJSON = {
  name?: string
  description?: string
  version?: string
  minzoom?: number
  maxzoom?: number
  center?: number[]
  bounds?: number[]
  type?: string
  format: string
  generator?: string
  json?: string
}

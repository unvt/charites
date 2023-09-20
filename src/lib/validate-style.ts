import maplibreStyleSpec from '@maplibre/maplibre-gl-style-spec'
const mapboxStyleSpec = require('@mapbox/mapbox-gl-style-spec')
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec'

export function validateStyle(
  style: StyleSpecification,
  provider = 'default',
): void {
  let result = []
  if ('mapbox' === provider) {
    result = mapboxStyleSpec.validate(style)
  } else {
    result = maplibreStyleSpec.validateStyleMin(style)
  }

  const errors = []
  for (let i = 0; i < result.length; i++) {
    const msg = result[i].message
    if (msg) {
      const layerMatch = msg.match(/^layers\[([0-9]+)\]/)
      if (layerMatch) {
        const layerIndex = Number(layerMatch[1])
        const layerId = style.layers[layerIndex].id
        errors.push(`Layer "${layerId}": ${msg}`)
      } else {
        errors.push(msg)
      }
    }
  }

  if (errors.length) {
    throw `\u001b[31mError:\u001b[0m ${errors.join(
      '\n\u001b[31mError:\u001b[0m ',
    )}`
  }
}

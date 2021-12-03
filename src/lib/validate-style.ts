const maplibreStyleSpec = require('@maplibre/maplibre-gl-style-spec')
const mapboxStyleSpec = require('@mapbox/mapbox-gl-style-spec')
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec/types'

export function validateStyle(
  style: StyleSpecification,
  provider = 'default',
): void {
  let result = []
  if ('mapbox' === provider) {
    result = mapboxStyleSpec.validate(style)
  } else {
    result = maplibreStyleSpec.validate(style)
  }

  const errors = []
  for (let i = 0; i < result.length; i++) {
    if (result[i].message) {
      errors.push(result[i].message)
    }
  }

  if (errors.length) {
    throw `\u001b[31mError:\u001b[0m ${errors.join(
      '\n\u001b[31mError:\u001b[0m ',
    )}`
  }
}

const maplibreStyleSpec = require('@maplibre/maplibre-gl-style-spec')
const mapboxStyleSpec = require('@mapbox/mapbox-gl-style-spec')

export function validateStyle(style: object, provider: string = "default"): void {
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
    throw `\u001b[31mError:\u001b[0m ${errors.join("\n\u001b[31mError:\u001b[0m ")}`
  }
}
